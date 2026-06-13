from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models
from database import engine, get_db
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# This tells FastAPI exactly what data to expect from the frontend
class StudentCreate(BaseModel):
    name: str
    dept: str
    idNum: str
    score: float

app = FastAPI(title="Student360 API")
# This line tells SQLAlchemy to create the student360.db file and build the tables!
models.Base.metadata.create_all(bind=engine)

# --- CORS CONFIGURATION ---
# This tells Python: "It is safe to accept requests from our React app on port 5173"
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "success", "message": "Welcome to the Student360 Backend Control Room!"}

# Notice we added `db: Session = Depends(get_db)` to give this route access to the database!
@app.get("/api/top-performers")
def get_top_performers(db: Session = Depends(get_db)):
    
    # 1. Query the database: Get all students, order by score (highest first), limit to 5
    top_students = db.query(models.Student).order_by(models.Student.score.desc()).limit(5).all()
    
    # 2. Format the database objects into the exact JSON structure our React frontend expects
    result = []
    for index, student in enumerate(top_students):
        result.append({
            "id": f"0{index + 1}",      # Formats numbers as "01", "02", etc.
            "name": student.name,
            "dept": student.dept,
            "idNum": student.id_num,
            "score": student.score
        })
        
    return result

# We use @app.post because we are SENDING data to the server, not just getting it
@app.post("/api/students")
def create_student(student: StudentCreate, db: Session = Depends(get_db)):
    
    # 1. Translate the Pydantic data into a SQLAlchemy database model
    new_student = models.Student(
        name=student.name,
        dept=student.dept,
        id_num=student.idNum,
        score=student.score
    )
    
    # 2. Add it to the workspace and save it permanently
    db.add(new_student)
    db.commit()
    
    # 3. Tell the frontend it worked
    return {"message": "Success!", "name": new_student.name}

# Fetches EVERY student in the database
@app.get("/api/students/all")
def get_all_students(db: Session = Depends(get_db)):
    students = db.query(models.Student).all()
    
    result = []
    for student in students:
        result.append({
            "id": student.id,
            "name": student.name,
            "dept": student.dept,
            "idNum": student.id_num,
            "score": student.score
        })
        
    return result