import functools
from haystack.nodes import FARMReader
from haystack.utils import convert_files_to_docs
from haystack.pipelines import Pipeline
from haystack.nodes.connector import Crawler
from haystack.nodes.preprocessor import PreProcessor


def pdf_scrape(pdf_dir:str):
    docs = convert_files_to_docs(dir_path=pdf_dir)
    return docs

@functools.lru_cache
def web_parse_pipeline(url: str, output_dir: str):
    # document_store = InMemoryDocumentStore()
    crawler = Crawler(urls=[url], 
                      output_dir=output_dir,
                      webdriver_options=["--headless",
                                         "--disable-dev-shm-usage",
                                         "--no-sandbox",
                                         "--disable-extensions",
                                         "--remote-debugging-port=9222"]
#   apparently must include remote debugging port for it to work
                      )
    preprocessor = PreProcessor(
        clean_empty_lines=True,
        clean_whitespace=True,
        clean_header_footer=False,
        split_by="word",
        split_length=500,
        split_respect_sentence_boundary=True,
    )
    reader = FARMReader(model_name_or_path="deepset/roberta-base-squad2-distilled")
    pipeline = Pipeline()
    pipeline.add_node(component=crawler, name="crawler", inputs=['File'])
    pipeline.add_node(component=preprocessor, name="preprocessor", inputs=['crawler'])
    search_pipeline = Pipeline()
    search_pipeline.add_node(component=reader, name='reader', inputs=["Query"])
    
    return pipeline, search_pipeline