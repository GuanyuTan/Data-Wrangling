import typing as t
from pydantic import BaseModel


class File(BaseModel):
    filename: str
    filepath: str
    id: int
    owner_id: int

    class Config:
        orm_mode = True

# class User(BaseModel):
#     id: int
#     username: str
#     full_name: Union[str, None] = None
#     email: Union[str, None] = None
#     disabled: Union[bool, None] = None
#     file :List[File] = []
#     class Config:
#         orm_mode = True

class UserBase(BaseModel):
    email: str
    username: str = ""
    is_active: bool = True
    is_superuser: bool = False
    first_name: str = ""
    last_name: str = ""


class UserOut(UserBase):
    pass


class UserCreate(UserBase):
    password: str

    class Config:
        orm_mode = True


class UserEdit(UserBase):
    password: t.Optional[str] = None

    class Config:
        orm_mode = True


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str = None
    permissions: str = "user"


class Document(BaseModel):
    content:str
    id: int


class QueryAnswer(BaseModel):
    query:str
    answer:str



