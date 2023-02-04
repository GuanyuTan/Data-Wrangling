from typing import List, Union
from pydantic import BaseModel
from fastapi import File


class pdf_search_info(BaseModel):
    queries: List[str]
    file: bytes = File()

class search_info(BaseModel):
    # Input schema for user input
    # accepts url for website, query/keywords for searching
    queries: List[str]
    url: str

class User(BaseModel):
    username: str
    email: Union[str, None] = None
    full_name: Union[str, None] = None
    disabled: Union[bool, None] = None