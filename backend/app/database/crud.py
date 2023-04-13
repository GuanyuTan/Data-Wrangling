import os
from . import models, schemas
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from dotenv import load_dotenv

load_dotenv()
PWD_HASHING = os.getenv('PWD_HASHING')
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password =  pwd_context.hash(user.password)
    db_user = models.User(
        username=user.username,
        full_name=user.full_name if user.full_name else None,
        email=user.email, 
        hashed_password=hashed_password
        )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Not yet checked
def update_full_name(db: Session, user:schemas.User):
    user_db = get_user_by_username(db, user.username)
    user_db.full_name = user.full_name
    db.session.commit()

# def get_user_by_name(db:Session, username: str):
#     return db.query(models.User).filter(models.User.username == username).first()


def store_file(db: Session, file:schemas.File):
    db_file = models.File(
        filename = file.filename,
        filepath = file.filepath,
        owner_id = file.owner_id
    )
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    return db_file

def get_files_per_user(db:Session, owner_id:int):
    return db.query(models.File).filter(models.File.owner_id == owner_id).all()

