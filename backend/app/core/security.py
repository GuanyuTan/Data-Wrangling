import jwt
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta
from dotenv import load_dotenv

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

load_dotenv()
SECRET_KEY = "{{cookiecutter.secret_key}}"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15


def get_password_hash(password: str) -> str:
    """Hash Password Using HS256

    Args:
        password (str): Unhashed Password

    Returns:
        str: Hashed Password
    """
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Compare hashed password

    Args:
        plain_password (str): unhashed password
        hashed_password (str): hashed password

    Returns:
        bool: _description_
    """
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(*, data: dict, expires_delta: timedelta = None)-> str:
    """Creates JWT access token for user.

    Args:
        data (dict): User Data
        expires_delta (timedelta, optional): Time to expire in . Defaults to None.

    Returns:
        str: _description_
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt