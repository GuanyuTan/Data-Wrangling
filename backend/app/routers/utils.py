import functools
import os

import uuid
from pathlib import Path
from typing import Type, List
import inspect
from dotenv import load_dotenv
from fastapi import UploadFile, Form
from pydantic import BaseModel
from haystack.nodes import FARMReader, TransformersReader
from haystack.utils import convert_files_to_docs
from haystack.pipelines import Pipeline
from haystack.nodes.connector import Crawler
from haystack.nodes.preprocessor import PreProcessor
from sqlalchemy.orm import Session
from db import crud, models, schemas

import pandas as pd
os.environ["TOKENIZERS_PARALLELISM"] = "false"

load_dotenv()
FILE_DIR = os.getenv("FILE_DIR")
MODEL_DIR = os.getenv("MODEL_DIR")


def remove_newline(string: str):
    string = string.replace("-\n", "")
    string = string.replace("\n", " ")
    return string


async def update_file_db(db: Session, file_meta: schemas.File):
    return crud.store_file(db, file=file_meta)


async def write_file(db: Session, file: UploadFile, owner_id: int):
    path = os.path.join(
        FILE_DIR, "PDF/", f"{uuid.uuid4().hex}_{file.filename}")
    # path = os.path.join(FILE_DIR, "PDF", file.filename)
    with open(path, "wb") as f:
        obj = await file.read()
        f.write(obj)
        f.close()
    file_meta = models.File(
        filename=file.filename,
        filepath=path,
        owner_id=owner_id
    )
    return await update_file_db(db=db, file_meta=file_meta)


async def write_files(files: List[UploadFile]):
    for file in files:
        with open(os.path.join(FILE_DIR, "PDF/TEMP", file.filename), "wb") as f:
            obj = await file.read()
            f.write(obj)
            f.close()


async def write_files_(db: Session, files: List[UploadFile], user: schemas.User):
    for file in files:
        await write_file(db=db, file=file, owner_id=user.id)


def pdf_scrape_(queries: List[str], pdf_dir: str, delete=True):
    # This uses PDFToTextConverter
    docs = convert_files_to_docs(dir_path=pdf_dir, clean_func=remove_newline)
    # preprocessor = PreProcessor(
    #     clean_empty_lines=True,
    #     clean_whitespace=True,
    #     clean_header_footer=True,
    #     split_by="passage",
    #     split_length=1,
    #     split_respect_sentence_boundary=False
    # )
    # docs = preprocessor.process(documents=docs)
    reader = FARMReader(
        model_name_or_path="deepset/roberta-base-squad2-distilled", use_gpu=True)
    answers = []
    for query in queries:
        ans = reader.predict(query=query, documents=docs)
        answers.append(ans)

    response = parse_ans(docs, answers, queries)
    if delete:
        for filename in os.listdir(pdf_dir):
            file_path = os.path.join(pdf_dir, filename)
            try:
                os.remove(file_path)
            except Exception as e:
                print(e)
                print("Failed to remove file")
    return response


@functools.lru_cache
def web_parse_pipeline(url: str, output_dir: str = os.path.join(FILE_DIR, "web")):
    # document_store = InMemoryDocumentStore()
    crawler = Crawler(urls=[url],
                      output_dir=output_dir,
                      crawler_depth=0,
                      webdriver_options=["--headless",
                                         "--disable-dev-shm-usage",
                                         "--no-sandbox",
                                         "--disable-extensions",
                                         "--remote-debugging-port=9222"]
                      #   apparently must include remote debugging port for it to work
                      )
    preprocessor = PreProcessor(
        clean_empty_lines=True,
        clean_whitespace=True,
        clean_header_footer=True,
        split_by="word",
        split_length=200,
        split_respect_sentence_boundary=True
    )
    reader = TransformersReader(
        model_name_or_path="deepset/roberta-base-squad2-distilled",)
    pipeline = Pipeline()
    pipeline.add_node(component=crawler, name="crawler", inputs=['File'])
    pipeline.add_node(component=preprocessor,
                      name="preprocessor", inputs=['crawler'])
    return pipeline, reader


def web_scrape_(url: str, queries: List[str]):
    pre_pipe, reader = web_parse_pipeline(url)
    documents = pre_pipe.run(params={"crawler": {'return_documents': True}})
    answers = []
    for query in queries:
        ans = reader.predict(documents=documents["documents"], query=query)
        answers.append(ans)
    response = parse_ans(documents["documents"], answers, queries)
    print(response)
    return response


def parse_ans(docs, answers, queries):
    response = {}
    response["documents"] = [{
        "content": doc.content,
        "id": doc.id,
    }
        for doc in docs]
    for answer in answers:
        answer_list = []
        for index, ans in enumerate(answer["answers"]):
            ans = ans.__dict__
            ans["id"] = index
            ans["score"] = round(ans["score"], 2)
            answer_list.append(ans)
        answer["answers"] = answer_list
    if not isinstance(answers, List):
        answers = [answers,]
    response["answers"] = answers

    response["query"] = queries
    return response


def convert_squad(query_ans:List[schemas.QueryAnswer], document: schemas.Document):
    data = {
        "data": [
            {
                "paragraphs": [
                    {
                        "qas": [
                            {
                                "question": q.query,
                                "id": uuid.uuid4().hex,
                                "answers": [
                                    {
                                        "answer_id": uuid.uuid4().hex,
                                        "document_id": document.id,
                                        "text": q.answer,
                                        "answer_start": document.content.index(q.answer),
                                    }
                                ]
                            }

                            for q in query_ans],
                        "context": document.content,
                        "document_id": document.id
                    }

                ]
            }
        ]
    }
    return data

def train_(data_dir:str, file_name:str):
    reader = FARMReader(model_name_or_path="distilbert-base-uncased-distilled-squad", use_gpu=True)
    # data_dir = "PATH/TO_YOUR/TRAIN_DATA"
    reader.train(data_dir=data_dir, train_filename=file_name, use_gpu=True, n_epochs=1, save_dir=MODEL_DIR)
    remove_files_in_dir(data_dir)

def remove_files_in_dir(file_dir:str):
    for filename in os.listdir(file_dir):
            file_path = os.path.join(file_dir, filename)
            try:
                os.remove(file_path)
            except Exception as e:
                print(e)
                print("Failed to remove file")

def as_form(cls: Type[BaseModel]):
    """
    Adds an as_form class method to decorated models. The as_form class method
    can be used with FastAPI endpoints
    """
    new_params = [
        inspect.Parameter(
            field.alias,
            inspect.Parameter.POSITIONAL_ONLY,
            default=(Form(field.default) if not field.required else Form(...)),
        )
        for field in cls.__fields__.values()
    ]

    async def _as_form(**data):
        return cls(**data)

    sig = inspect.signature(_as_form)
    sig = sig.replace(parameters=new_params)
    _as_form.__signature__ = sig  # type: ignore
    setattr(cls, "as_form", _as_form)
    return
