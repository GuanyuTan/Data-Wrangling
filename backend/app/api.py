from fastapi import FastAPI
from json import load
from pyexpat import model
from typing import Union, List, Optional
from fastapi import FastAPI, Form, Query, File, UploadFile
from pydantic import BaseModel, Field, constr
import pandas as pd
import uvicorn
import functools
# from sentence_transformers import SentenceTransformer, util
from fastapi.middleware.cors import CORSMiddleware
from haystack.nodes.connector import Crawler
from haystack.nodes.file_converter import PDFToTextConverter
from haystack.nodes.preprocessor import PreProcessor
from haystack.pipelines import Pipeline
from haystack.nodes import PDFToTextConverter
from haystack.utils.preprocessing import convert_files_to_docs
from haystack.document_stores import InMemoryDocumentStore
from haystack.nodes import FARMReader
app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class pdf_search_info(BaseModel):
    queries: List[str]
    file: bytes = File()

class search_info(BaseModel):
    # Input schema for user input
    # accepts url for website, query/keywords for searching
    queries: List[str]
    url: str

@app.post("/data_wrangling/web_scrape")
async def web_scrape(info: search_info):
    pre_pipe, search_pipe = web_parse_pipeline("https://haystack.deepset.ai/reference/file-converters", "./Files/Docs")
    
    
@functools.lru_cache
def web_parse_pipeline(url: str, output_dir: str):
    # document_store = InMemoryDocumentStore()
    crawler = Crawler(urls=[url], 
                      output_dir=output_dir,
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
        clean_header_footer=False,
        split_by="word",
        split_length=500,
        split_respect_sentence_boundary=True,
    )
    reader = FARMReader(model_name_or_path="deepset/roberta-base-squad2-distilled")
    pipeline = Pipeline()
    pipeline.add_node(component=crawler, name="crawler", inputs=['File'])
    pipeline.add_node(component=preprocessor, name="preprocessor", inputs=['crawler'])
    search_pipeline = Pipeline()
    search_pipeline.add_node(component=reader, name='reader', inputs=["Query"])
    return pipeline, search_pipeline


def pdf_scrape(pdf_dir:str):
    docs = convert_files_to_docs(dir_path=pdf_dir)
    return docs


