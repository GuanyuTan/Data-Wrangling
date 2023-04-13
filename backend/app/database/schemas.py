from typing import List, Union
from pydantic import BaseModel


class File(BaseModel):
    filename: str
    filepath: str
    id: int
    owner_id: int

    class Config:
        orm_mode = True

class User(BaseModel):
    id: int
    username: str
    full_name: Union[str, None] = None
    email: Union[str, None] = None
    disabled: Union[bool, None] = None
    file :List[File] = []
    class Config:
        orm_mode = True

class UserCreate(User):
    password: str

class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Union[str, None] = None

class Document(BaseModel):
    content:str
    id: int

class QueryAnswer(BaseModel):
    query:str
    answer:str


