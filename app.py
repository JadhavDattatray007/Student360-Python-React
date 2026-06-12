from flask import Flask, render_template, request, redirect
import json
import os

app = Flask(__name__)

FILE = "students.json"

# Load existing data
def load_students():
    if os.path.exists(FILE):
        with open(FILE, "r") as f:
            return json.load(f)
    return []

# Save data
def save_students(data):
    with open(FILE, "w") as f:
        json.dump(data, f, indent=4)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    email = request.form['email']
    course = request.form['course']

    students = load_students()
    students.append({
        "name": name,
        "email": email,
        "course": course
    })

    save_students(students)

    return redirect('/students')

@app.route('/students')
def show_students():
    students = load_students()
    return render_template('students.html', students=students)

if __name__ == '__main__':
    app.run(debug=True)