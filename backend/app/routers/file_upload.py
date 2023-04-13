from typing import Optional, List
from dotenv import load_dotenv
import os
import json
import shutil
import uuid
from pathlib import Path

from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from pydantic import BaseModel

from .utils import as_form

load_dotenv()
FILE_DIR = os.getenv("FILE_DIR")

router = APIRouter()

@as_form
class FileConverterParams(BaseModel):
    remove_numeric_tables: Optional[bool] = None
    valid_languages: Optional[List[str]] = None


@as_form
class PreprocessorParams(BaseModel):
    clean_whitespace: Optional[bool] = None
    clean_empty_lines: Optional[bool] = None
    clean_header_footer: Optional[bool] = None
    split_by: Optional[str] = None
    split_length: Optional[int] = None
    split_overlap: Optional[int] = None
    split_respect_sentence_boundary: Optional[bool] = None


class Response(BaseModel):
    file_id: str


@router.post("/file-upload")
def upload_file(
    files: UploadFile = File(...),
    # JSON serialized string
    # meta: Optional[str] = Form("null"),  # type: ignore
):
    """
    You can use this endpoint to upload a file for indexing
    (see https://haystack.deepset.ai/guides/rest-api#indexing-documents-in-the-haystack-rest-api-document-store).
    """

    file_paths: list = []
    file_metas: list = []

    # meta_form = json.loads(meta) or {}  # type: ignore
    # if not isinstance(meta_form, dict):
    #     raise HTTPException(status_code=500, detail=f"The meta field must be a dict or None, not {type(meta_form)}")

    # for file in files:
    try:
        file_path = Path(os.path.join(FILE_DIR,"PDF")) / f"{uuid.uuid4().hex}_{files.filename}"
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(files.file, buffer)

        file_paths.append(file_path)
        # meta_form["name"] = file.filename
        # file_metas.append(meta_form)
    finally:
        files.file.close()