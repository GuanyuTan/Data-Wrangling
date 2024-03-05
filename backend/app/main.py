from fastapi import FastAPI, Depends
from starlette.requests import Request
from app.db.session import SessionLocal
from app.routers.users import users
from routers import wrangling, file_upload, auth
from app.core.auth import get_current_user 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(

)

origins = [
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    request.state.db = SessionLocal()
    response = await call_next(request)
    request.state.db.close()
    return response

app.include_router(users.router)
app.include_router(wrangling.router)
app.include_router(file_upload.router)
app.include_router(auth.router)