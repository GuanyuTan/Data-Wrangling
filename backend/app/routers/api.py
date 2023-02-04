from fastapi import APIRouter

# from utils import web_parse_pipeline
# from models import search_info

from .utils import web_parse_pipeline

from models import pdf_search_info, search_info, User

router = APIRouter(
    prefix="/api",
    tags=["api"],
    # dependencies=,
    responses={404: {"description": "Not found"}},
)



@router.post("/web_scrape")
async def web_scrape(info: search_info):
    pre_pipe, search_pipe = web_parse_pipeline("https://haystack.deepset.ai/reference/file-converters", "./Files/Docs")
    documents = pre_pipe.run(params={"crawler": {'return_documents': True}})
    print(type(documents["documents"][0]))
    return search_pipe.run(query=info.queries ,documents=documents["documents"])
    