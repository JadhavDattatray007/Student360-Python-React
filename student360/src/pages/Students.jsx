import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, BarChart3, FileText, LogOut, Search } from 'lucide-react'

export default function Students() {
  const navigate = useNavigate()
  const [allStudents, setAllStudents] = useState([])

  // Fetch all students when the page loads
  useEffect(() => {
    fetch('https://student360-python-react.onrender.com/api/students/all')
      .then(response => response.json())
      .then(data => setAllStudents(data))
      .catch(error => console.error("Error fetching students:", error))
  }, [])

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-6 border-b border-slate-100">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <span className="text-2xl">🎓</span> Student360
            </h1>
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-1">Admin Console</p>
          </div>
          <nav className="p-4 space-y-2">
            <button onClick={() => navigate('/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded font-semibold text-sm transition-colors">
              <LayoutDashboard size={18} /> Dashboard
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 text-slate-900 rounded font-semibold text-sm">
              <Users size={18} /> Students
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded font-semibold text-sm transition-colors">
              <BarChart3 size={18} /> Analytics
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded font-semibold text-sm transition-colors">
              <FileText size={18} /> Reports
            </button>
          </nav>
        </div>
        <div className="p-4 border-t border-slate-100">
          <button onClick={() => navigate('/')} className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded hover:bg-slate-50 hover:text-slate-900 font-bold text-xs uppercase tracking-wider transition-colors">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
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
                </tr>
              ))}
            </tbody>
          </table>
          {allStudents.length === 0 && (
            <div className="p-8 text-center text-slate-500">Loading students...</div>
          )}
        </div>
      </main>
    </div>
  )
}