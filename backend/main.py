from fastapi import FastAPI
from base import conn
from psycopg2 import pool
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://popularnews.org",
    "https://popularnews.org"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
async def read_root():
    with conn.cursor() as cur:
        cur.execute("""
        SELECT * FROM articles;
        """)

        return cur.fetchall()

@app.get("/api/user{}")
async def read_users_table(email:str):
    with conn.cursor() as cur:
        cur.execute(f"""
        SELECT * FROM users
        WHERE 
            email = '{email}';
        """)
        return cur.fetchall()

@app.post("/api/add_user{}")
async def add_user(email:str):
    with conn.cursor() as cur:
        cur.execute(f"""
            INSERT INTO users (email, category)
            VALUES ('{email}','Any')
            """)
        conn.commit()
        return

@app.post("/api/user_category{}")
async def set_category(email:str, category:str):
    with conn.cursor() as cur:
        cur.execute(f"""
            UPDATE users
            SET
                category = '{category}'
            WHERE
                email = '{email}';
        """)
        conn.commit()
        return
    
@app.get("/api/get_articles{}")
async def get_articles(category:str):
    with conn.cursor() as cur:
        if category == 'All HTTP/1.1' or category == 'All':
            category_lower = 'general'
        else:
            category_lower = category.lower()

        cur.execute(f"""
            SELECT * FROM articles
            WHERE
                category = '{category_lower}';
            """)
        return cur.fetchall()


@app.post("/api/add_visit_count{}")
async def add_visit_count():
    with conn.cursor() as cur:
        cur.execute(f"""
        SELECT * FROM users
        WHERE
            category = 'count';
        """)
        current_count = cur.fetchall()
        #print('current_count = '+str(current_count[0][3])) # index is 3 for first_name which stores the count
        cur.execute(f"""
            UPDATE users
            SET
                first_name = '{str(float(current_count[0][3])+0.5)}'
            WHERE
                category = 'count';
            """)
        conn.commit()
        return 

@app.get("/api/get_visit_count{}")
async def get_visit_count():
    with conn.cursor() as cur:
        cur.execute(f"""
            SELECT * FROM users
            WHERE
                category = 'count';
            """)
        result = cur.fetchall()
        count = result[0][3]
        return  round(float(count))