import requests
import psycopg2
from local_settings import postgresql as settings

dbname = settings['pgdb']
user = settings['pguser']
password = settings['pgpasswd']
host = settings['pghost']
port = settings['pgport']

conn = psycopg2.connect(f"dbname={dbname} user={user} password={password} host={host} port={port}")
# dbname*: the database name
# *database*: the database name (only as keyword argument)
# *user*: user name used to authenticate
# *password*: password used to authenticate
# *host*: database host address (defaults to UNIX socket if not provided)
# *port*: connection port number (defaults to 5432 if not provided)





# cur.execute("""
#     INSERT INTO users (first_name, category)
#     VALUES ('0', 'count')


# """)

# cur.execute("""
#     DELETE FROM users
# """)


# conn.commit()
# cur.close()
# conn.close()




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


#cur.execute("""
# CREATE TABLE Users
# (
#     Catagory TEXT,
#     Theme TEXT,
#     Language TEXT,
#     first_name TEXT,
#     last_name TEXT,
#     email TEXT;
# )
# """)