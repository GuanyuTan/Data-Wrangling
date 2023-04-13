from fastapi import APIRouter, UploadFile, File, Depends, status, HTTPException
from typing import List
from dotenv import load_dotenv
import uuid
import json
import os, sys
import asyncio
from database.database import SessionLocal, engine
from fastapi.security import OAuth2PasswordBearer
# from utils import web_parse_pipeline
# from models import search_info

from .users import get_current_user
from .utils import write_files, pdf_scrape_, web_scrape_, write_file, write_files_, convert_squad, train_
from database import crud, models, schemas
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from .schemas import Search_info, Web_search_info

models.Base.metadata.create_all(bind=engine)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/token")
load_dotenv()
ALGORITHM = os.getenv('ALGORITHM')
SECRET_KEY = os.getenv('SECRET_KEY')
PWD_HASHING = os.getenv('PWD_HASHING')
DATA_DIR = os.getenv('DATA_DIR')
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

load_dotenv()
FILE_DIR = os.getenv("FILE_DIR")
router = APIRouter(
    prefix="/api",
    tags=["api"],
    # dependencies=,
    responses={404: {"description": "Not found"}},
)


@router.post("/web_scrape")
async def web_scrape(info: Web_search_info):
    return web_scrape_(url=info.url, queries=info.queries)
    
    
@router.post("/pdf_scrape")
async def pdf_scrape(queries:List[str], files:List[UploadFile] = File(description="PDFs only") ):
    delete = False
    print(queries)
    if not isinstance(files,list):
        files = [files,]
    write = write_files(files=files)
    await asyncio.wait_for(write, timeout=None)
    response = pdf_scrape_(queries,os.path.join(FILE_DIR,"PDF/TEMP"), delete)
    return response

@router.post("/pdf_scrape_")
async def pdf_scrape_with_auth(queries:List[str], files:List[UploadFile] = File(description="PDFs only"), user: schemas.User = Depends(get_current_user), db:Session = Depends(get_db)):
    print(queries)
    if not isinstance(files,list):
        files = [files,]
    delete = False
    try:
        # TODO Link this function to the user specific files.
        user = get_current_user()
        write = write_files_(db=db, files=files, user=user)
        await asyncio.wait_for(write, timeout=None)
        response = pdf_scrape_(queries,os.path.join(FILE_DIR,"PDF/TEMP"),delete)
        return response
    except HTTPException as e:
        if e.status_code == status.HTTP_401_UNAUTHORIZED:
            write = write_files(files=files)
            await asyncio.wait_for(write, timeout=None)
            response = pdf_scrape_(queries,os.path.join(FILE_DIR,"PDF/TEMP"),delete)
            return response
    
    # write = write_files(files=files)
    # await asyncio.wait_for(write, timeout=None)
    # response = pdf_scrape_(queries,os.path.join(FILE_DIR,"PDF"))
    return response

@router.post("/upload_file")
async def upload_file(file: UploadFile, db=Depends(get_db), current_user: schemas.User = Depends(get_current_user)):
    file_db = await write_file(db=db, file=file, owner_id=current_user.id)
    return file_db


@router.post("/train")
async def train(query_ans:List[schemas.QueryAnswer], document:schemas.Document):
    data = convert_squad(query_ans=query_ans,document=document)
    file_name = f"{uuid.uuid4().hex}.json"
    with open(os.path.join(DATA_DIR,file_name), "x") as file:
        file.write(json.dumps(data))
    train_(data_dir=DATA_DIR, file_name=file_name)
   
    return{"response": "All is good"}


