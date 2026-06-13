from sqlalchemy import Column, Integer, String, Float
from database import Base

class Student(Base):
    __tablename__ = "students"

    # We define the columns of our database table here!
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    dept = Column(String)
    id_num = Column(String, unique=True, index=True)
    score = Column(Float)