from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# 1. DELETE the old sqlite link and PASTE your Neon link inside the quotes here!
# It will look something like "postgresql://neondb_owner:xyz...@ep-cool...neon.tech/neondb?sslmode=require"
SQLALCHEMY_DATABASE_URL = "postgresql://neondb_owner:npg_u9Ogr0hbYnqW@ep-silent-star-aotlsek2-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# 2. We removed the "check_same_thread" argument because Postgres doesn't need it
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# A 'session' is the temporary workspace where we write and read data
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# All of our database tables will inherit from this Base class
Base = declarative_base()

# A helper function we will use later to open and close connections safely
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()