import requests
import json
import datetime

from pelican import signals
from pelican.contents import Article
from pelican.readers import BaseReader

import os

#this loads the environmental variables.
from dotenv import load_dotenv

load_dotenv()

WEBINY_URL = os.getenv("WEBINY_URL")
AUTHORIZATION = os.getenv("AUTHORIZATION")
XTENANT = os.getenv("XTENANT")


# GraphQL query
query = """
query canBlogs {
  listCanBlogs {
    data {
      articleId
      title
      category
      status
      body 
      summary    
    }
  }
}"""


url = WEBINY_URL
headers = {
    "content-type": "application/json",
    "Authorization": AUTHORIZATION,
    "x-tenant": XTENANT,
}

#this gets the data from Webiny API
payload = requests.post(url, json = {"query": query}, headers=headers)

jsonformat = payload.text

ARTICLES = {}

#this block convert the api payload from json to a python dictionary
try:
    ARTICLES = json.loads(jsonformat)
except IOError as e:
  print(e)
  print("Unable to convert file. Terminating session ...")
  exit(1)

def addBlogs(articleGenerator):
  settings = articleGenerator.settings

  baseReader = BaseReader(settings)

  dictionary = ARTICLES['data']['listCanBlogs']['data']

  
  for i in dictionary:
    content = i['body']

    # instantiating a new Article object using fields from our data. 
    #Use the key-value pairs as defined in the Article object.
    newBlog = Article(content, {
      "title": i['title'],
      "date": datetime.datetime.now(),   
      "status": i['status'],
      "summary": i['summary'],
      "category": baseReader.process_metadata("category", i['category']),
    })

    articleGenerator.articles.insert(i['articleId'], newBlog)

def register():
    signals.article_generator_pretaxonomy.connect(addBlogs)