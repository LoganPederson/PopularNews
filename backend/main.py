from fastapi import FastAPI
from base import conn, cur
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000"
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
    cur.execute("""
    SELECT * FROM articles;
    """)

    return cur.fetchall()

@app.get("/user{}")
async def read_users_table(email:str):
    cur.execute(f"""
    SELECT * FROM users
    WHERE 
        email = '{email}';
    """)
    return cur.fetchall()

@app.post("/add_user{}")
async def add_user(email:str):
    cur.execute(f"""
        INSERT INTO users (email, category)
        VALUES ('{email}','Any')
        """)
    conn.commit()
    return

@app.post("/user_category{}")
async def set_category(email:str, category:str):
    cur.execute(f"""
        UPDATE users
        SET
            category = '{category}'
        WHERE
            email = '{email}';
    """)
    conn.commit()
    return

