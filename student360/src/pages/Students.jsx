import { useState, useEffect } from 'react'
import { Search, Trash2 } from 'lucide-react'

export default function Students() {
  const [allStudents, setAllStudents] = useState([])

  // Fetch all students when the page loads
  useEffect(() => {
    fetch('https://student360-python-react.onrender.com/api/students/all')
      .then(response => response.json())
      .then(data => setAllStudents(data))
      .catch(error => console.error("Error fetching students:", error))
  }, [])

  // THE ERASER FUNCTION
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      
      // We are pointing this at localhost because our new Python Delete route is only on our computer right now!
      fetch(`https://student360-python-react.onrender.com/api/students/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          // Instantly remove the student from the screen without refreshing the page
          setAllStudents(allStudents.filter(student => student.id !== id))
        }
      })
      .catch(error => console.error("Error deleting student:", error))
    }
  }

  return (
    <>
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-2">Student Directory</h2>
          <p className="text-slate-500 max-w-xl">View and manage all enrolled students across the campus.</p>
        </div>
        <div className="relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
           <input type="text" placeholder="Search students..." className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 w-64" />
        </div>
      </header>

      {/* DATA TABLE */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold tracking-widest text-slate-500 uppercase">
              <th className="p-4">Database ID</th>
              <th className="p-4">Student Name</th>
              <th className="p-4">Student ID</th>
              <th className="p-4">Department</th>
              <th className="p-4">Dev Score</th>
              {/* NEW COLUMN HEADER */}
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {allStudents.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-slate-400 font-mono text-sm">#{student.id}</td>
                <td className="p-4 font-bold text-slate-900">{student.name}</td>
                <td className="p-4 text-slate-500 text-sm">{student.idNum}</td>
                <td className="p-4 text-slate-500 text-sm">{student.dept}</td>
                <td className="p-4 font-black text-slate-900">{student.score}</td>
                
                {/* NEW RED DELETE BUTTON */}
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleDelete(student.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded hover:bg-red-50"
                    title="Delete Student"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        {allStudents.length === 0 && (
          <div className="p-8 text-center text-slate-500">Loading students...</div>
        )}
      </div>
    </>
  )
}