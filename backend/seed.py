from database import SessionLocal
from models import Student

# Open a session (a temporary workspace) to talk to the database
db = SessionLocal()

# Check if the database is already full so we don't accidentally double-add them
if db.query(Student).count() == 0:
    print("Database is empty. Adding students...")
    
    # Create our student records
    students_to_add = [
        Student(name="Diya Kumar", dept="Computer Science", id_num="CS20241020", score=89.3),
        Student(name="Aditya Nair", dept="Information Technology", id_num="IT20241037", score=83.5),
        Student(name="Sai Mehta", dept="Information Technology", id_num="IT20241025", score=83.1),
        Student(name="Aanya Sharma", dept="Electronics", id_num="EL20221039", score=80.4),
        Student(name="Aarush Sharma", dept="Mechanical", id_num="ME20221021", score=78.6)
    ]
    
    # Add them to the workspace
    db.add_all(students_to_add)
    
    # Commit saves the changes permanently to the student360.db file!
    db.commit()
    print("Success! 5 students added to the database.")
else:
    print("Database already has data. Skipping seed.")

# Close the connection
db.close()