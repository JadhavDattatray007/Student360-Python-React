from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Student360 API")

# --- CORS CONFIGURATION ---
# This tells Python: "It is safe to accept requests from our React app on port 5173"
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "success", "message": "Welcome to the Student360 Backend Control Room!"}

@app.get("/api/top-performers")
def get_top_performers():
    return [
        {"id": "01", "name": "Diya Kumar", "dept": "Computer Science", "idNum": "CS20241020", "score": 89.3},
        {"id": "02", "name": "Aditya Nair", "dept": "Information Technology", "idNum": "IT20241037", "score": 83.5},
        {"id": "03", "name": "Sai Mehta", "dept": "Information Technology", "idNum": "IT20241025", "score": 83.1},
        {"id": "04", "name": "Aanya Sharma", "dept": "Electronics", "idNum": "EL20221039", "score": 80.4},
        {"id": "05", "name": "Aarush Sharma", "dept": "Mechanical", "idNum": "ME20221021", "score": 78.6},
    ]