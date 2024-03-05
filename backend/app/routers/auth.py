from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException, status, Request
from datetime import timedelta
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from db.session import get_db
from core import security
from core.auth import authenticate_user, sign_up_new_user, get_user_by_email, get_current_user

router = APIRouter(prefix="/api")

@router.post("/token")
async def login(
    db=Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(
        minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    if user.is_superuser:
        permissions = "admin"
    else:
        permissions = "user"
    access_token = security.create_access_token(
        data={"sub": user.email, "permissions": permissions},
        expires_delta=access_token_expires,
    )

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/signup")
async def signup(
    db:Session =Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
):
    user = sign_up_new_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Account already exists",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(
        minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    if user.is_superuser:
        permissions = "admin"
    else:
        permissions = "user"
    access_token = security.create_access_token(
        data={"sub": user.email, "permissions": permissions},
        expires_delta=access_token_expires,
    )

    return {"access_token": access_token, "token_type": "bearer"}

# @router.post("/register")
# async def register(request: Request, db: Session=Depends(get_db)):
#     form = UserCreateForm(request=request)
#     await form.load_data()
#     if await form.is_valid():
#         user = get_user_by_email(email=form.email)
#         if user: 
#             raise HTTPException(status_code=409, detail="Email already in use")
#         user = sign_up_new_user(
#             db,
#             email = form.email,
#             password= form.password,
#             username= form.username,
#             first_name= form.username,
#             last_name= form.last_name
#             )
#         access_token_expires = timedelta(
#             minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES
#         )
#         if user.is_superuser:
#             permissions = "admin"
#         else:
#             permissions = "user"
#         access_token = security.create_access_token(
#             data={"sub": user.email, "permissions": permissions},
#             expires_delta=access_token_expires,
#         )

#         return {"access_token": access_token, "token_type": "bearer"}