from fastapi import APIRouter, Request, Depends, Response, encoders
import typing as t
from sqlalchemy.orm import Session
from db.session import get_db
from db.crud import (
    get_users,
    get_user,
    create_user,
    delete_user,
    edit_user,
    get_files_per_user,
)
from db.schemas import UserCreate, UserEdit, User, File, Token
from core.auth import get_current_user, get_current_active_superuser

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "/",
    response_model=t.List[User],
    response_model_exclude_none=True,
)
async def users_list(
    response: Response,
    db=Depends(get_db),
    # current_user=Depends(get_current_active_superuser),
):
    """
    Get all users
    """
    users = get_users(db)
    # This is necessary for react-admin to work
    response.headers["Content-Range"] = f"0-9/{len(users)}"
    return users


@router.get("/me",
            response_model=User, 
            response_model_exclude_none=True
            )
async def user_me(current_user=Depends(get_current_user)):
    """
    Get own user
    """
    return current_user


@router.get(
    "/{user_id}",
    response_model=User,
    response_model_exclude_none=True,
)
async def user_details(
    request: Request,
    user_id: int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_superuser),
):
    """
    Get any user details
    """
    user = get_user(db, user_id)
    return user
    # return encoders.jsonable_encoder(
    #     user, skip_defaults=True, exclude_none=True,
    # )


@router.post("/", response_model=User, response_model_exclude_none=True)
async def user_create(
    request: Request,
    user: UserCreate,
    db=Depends(get_db),
    current_user=Depends(get_current_active_superuser),
):
    """
    Create a new user
    """
    return create_user(db, user)


@router.put(
    "/{user_id}", response_model=User, response_model_exclude_none=True
)
async def user_edit(
    request: Request,
    user_id: int,
    user: UserEdit,
    db=Depends(get_db),
    current_user=Depends(get_current_active_superuser),
):
    """
    Update existing user
    """
    return edit_user(db, user_id, user)


@router.delete(
    "/{user_id}", response_model=User, response_model_exclude_none=True
)
async def user_delete(
    request: Request,
    user_id: int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_superuser),
):
    """
    Delete existing user
    """
    return delete_user(db, user_id)


@router.get("/files/", response_model=t.List[File])
def get_files(
        db: Session = Depends(get_db),
        user: User = Depends(get_current_user)):
    files = get_files_per_user(db=db, owner_id=user.id)
    return files
