import requests
from base import conn, cur
from local_settings import api


'''
This function takes articles_json the returned object from requests
call to the newsapi.org api, and a string category. 20 articles from
each category are INSERT'd into the table 'articles' assuming they
do not already exist.

DO NOT USE THIS FUNCTION IF TABLE ALREADY POPULATED***
- Instead, use the update_articles_table() function 

'''

def update_articles_table(articles_json, category):
    article_number = 0
    while article_number < 20:

        # replace single quotes with two single quotes
        author = articles_json['articles'][article_number]['author']
        content = articles_json['articles'][article_number]['content']
        description = articles_json['articles'][article_number]['description']
        publishedat = articles_json['articles'][article_number]['publishedAt']
        title = articles_json['articles'][article_number]['title']
        url = articles_json['articles'][article_number]['url']
        urltoimage = articles_json['articles'][article_number]['urlToImage']

        if author:
            author = author.replace("'","''")
        if content:
            content = content.replace("'","''")
        if description:
            description = description.replace("'","''")
        if publishedat:
            publishedat = publishedat.replace("'","''")
        if title:
            title = title.replace("'","''")
        if url:
            url = url.replace("'","''")
        if urltoimage:
            urltoimage.replace("'","''")

        cur.execute(f"""
        UPDATE articles 
        SET 
            articleid = {article_number},
            author= '{author}',
            content= '{content}',
            description= '{description}',
            publishedat= '{publishedat}',
            title= '{title}',
            url= '{url}',
            urltoimage= '{urltoimage}',
            category= '{category}'
        
        WHERE
            articleid={article_number} 
        AND 
            category='{category}';
        """)
        print("UPDATED ARTICLE "+str(article_number)+" in category "+str(category)+".")
        article_number=article_number+1


categories = {
    'business':f"https://newsapi.org/v2/top-headlines?country=us&category=business&{api['key']}",
    'general':f"https://newsapi.org/v2/top-headlines?country=us&category=general&{api['key']}",
    'health':f"https://newsapi.org/v2/top-headlines?country=us&category=health&{api['key']}",
    'science':f"https://newsapi.org/v2/top-headlines?country=us&category=science&{api['key']}",
    'sports':f"https://newsapi.org/v2/top-headlines?country=us&category=sports&{api['key']}",
    'entertainment':f"https://newsapi.org/v2/top-headlines?country=us&category=entertainment&{api['key']}",
    'technology':f"https://newsapi.org/v2/top-headlines?country=us&category=technology&{api['key']}"
}

for key in categories:
    articles = requests.get(categories[key]) # call api for each category
    articles_json = articles.json()
    update_articles_table(articles_json,key) # pass articles_json and the category

conn.commit()
cur.close()
conn.close()

#cur.execute("""
# CREATE TABLE Articles 
# (
#     ArticleID INT,
#     Author TEXT,
#     Content TEXT,
#     Description TEXT,
#     PublishedAt TEXT,
#     Title TEXT,
#     Url TEXT,
#     UrlToImage TEXT
# )
# """)