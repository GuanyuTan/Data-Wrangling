from fastapi import Depends, FastAPI
from routers import users, api, file_upload
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.include_router(users.router)
app.include_router(api.router)
app.include_router(file_upload.router)