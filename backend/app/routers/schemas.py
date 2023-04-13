from typing import List, Union, Type
import inspect
from pydantic import BaseModel
from fastapi import UploadFile, File, Form


class Search_info(BaseModel):
    queries: List[str]
    top_k: Union[int, None] = None

class Web_search_info(Search_info):
    # Input schema for user input
    # accepts url for website, query/keywords for searching
    url: str
