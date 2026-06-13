import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, BarChart3, FileText, LogOut, Building2, Award, Code, Trophy, UserPlus } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const academicTrendData = [
  { name: 'Sem 1', score: 75 }, { name: 'Sem 2', score: 73 },
  { name: 'Sem 3', score: 74 }, { name: 'Sem 4', score: 74 },
  { name: 'Sem 5', score: 76 }, { name: 'Sem 6', score: 78 },
  { name: 'Sem 7', score: 74 }, { name: 'Sem 8', score: 76 },
]

const departmentData = [
  { name: 'CS', score: 85 }, { name: 'IT', score: 82 },
  { name: 'Mech', score: 70 }, { name: 'Civil', score: 68 },
  { name: 'Elec', score: 75 },
]

export default function Dashboard() {
  const navigate = useNavigate()
  
  // 1. STATE BUCKETS
  const [topPerformers, setTopPerformers] = useState([])
  
  // This new bucket holds whatever the user types into the form
  const [formData, setFormData] = useState({
    name: '', dept: '', idNum: '', score: ''
  })

  // 2. HELPER FUNCTION TO FETCH DATA
  const fetchStudents = () => {
    fetch('http://localhost:8000/api/top-performers')
      .then(response => response.json())
      .then(data => setTopPerformers(data))
      .catch(error => console.error("Error fetching data:", error))
  }

  // Fetch when the page first loads
  useEffect(() => {
    fetchStudents()
  }, [])

  // 3. NEW FUNCTION TO SUBMIT THE FORM TO PYTHON
  const handleAddStudent = (e) => {
    e.preventDefault() // Stops the page from refreshing when you click submit
    
    // Send the data to our Python backend!
    fetch('http://localhost:8000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        dept: formData.dept,
        idNum: formData.idNum,
        score: parseFloat(formData.score) // Make sure score is sent as a decimal number
      })
    })
    .then(response => response.json())
    .then(() => {
      // Once Python says "Success!", refresh our list to show the new student
      fetchStudents()
      // Clear the form boxes so they are empty again
      setFormData({ name: '', dept: '', idNum: '', score: '' })
    })
    .catch(error => console.error("Error adding student:", error))
  }

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
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 text-slate-900 rounded font-semibold text-sm">
              <LayoutDashboard size={18} /> Dashboard
            </button>
            
            {/* ---> UPDATED BUTTON <--- */}
            <button onClick={() => navigate('/students')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded font-semibold text-sm transition-colors">
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
          <div className="px-4 py-2 mb-4">
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Signed in as</p>
            <p className="text-sm font-semibold truncate">admin@student360.edu</p>
          </div>
          <button onClick={() => navigate('/')} className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded hover:bg-slate-50 hover:text-slate-900 font-bold text-xs uppercase tracking-wider transition-colors">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <header className="mb-8">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Control Room</p>
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight mb-2">Dashboard</h2>
              <p className="text-slate-500 max-w-xl">A live, unified view of academic and co-curricular performance across the campus.</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Database Connected
            </div>
          </div>
        </header>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-4 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-r border-slate-100 bg-slate-50/50">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">Total Students</p>
              <Users size={16} className="text-slate-400" />
            </div>
            <p className="text-4xl font-black text-slate-900">41</p>
          </div>
          <div className="p-6 border-r border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">Departments</p>
              <Building2 size={16} className="text-slate-400" />
            </div>
            <p className="text-4xl font-black text-slate-900">5</p>
          </div>
          <div className="p-6 border-r border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">Certifications</p>
              <Award size={16} className="text-slate-400" />
            </div>
            <p className="text-4xl font-black text-slate-900">57</p>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">Projects</p>
              <Code size={16} className="text-slate-400" />
            </div>
            <p className="text-4xl font-black text-slate-900">39</p>
          </div>
        </div>

        {/* CHARTS, FORMS, AND LISTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
          
          <div className="lg:col-span-2 space-y-8">
            
            {/* ADD STUDENT FORM */}
            <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-sm border-l-4 border-l-slate-900">
              <div className="flex items-center gap-2 mb-6">
                <UserPlus size={20} className="text-slate-900" />
                <h3 className="text-lg font-bold text-slate-900">Onboard New Student</h3>
              </div>
              
              <form onSubmit={handleAddStudent} className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                  <input 
                    type="text" required
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-900" 
                    placeholder="e.g. Rahul Singh" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Student ID</label>
                  <input 
                    type="text" required
                    value={formData.idNum} onChange={(e) => setFormData({...formData, idNum: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-900" 
                    placeholder="e.g. CS20241050" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Department</label>
                  <select 
                    required
                    value={formData.dept} onChange={(e) => setFormData({...formData, dept: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    <option value="">Select Department...</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Civil">Civil</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Initial Dev Score</label>
                  <input 
                    type="number" step="0.1" max="100" required
                    value={formData.score} onChange={(e) => setFormData({...formData, score: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-900" 
                    placeholder="e.g. 85.5" 
                  />
                </div>
                <div className="col-span-2 mt-2">
                  <button type="submit" className="bg-slate-900 text-white font-bold py-2 px-6 rounded hover:bg-slate-800 transition-colors">
                    Save to Database
                  </button>
                </div>
              </form>
            </div>

            {/* Line Chart */}
            <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-sm">
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Academic Trend</p>
              <h3 className="text-lg font-bold text-slate-900 mb-6">Average marks across semesters</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={academicTrendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} domain={[0, 100]} />
                    <Tooltip cursor={{stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '3 3'}} />
                    <Line type="monotone" dataKey="score" stroke="#0f172a" strokeWidth={3} dot={{r: 4, fill: '#0f172a', strokeWidth: 0}} activeDot={{r: 6, fill: '#3b82f6'}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column: Top Performers List */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col h-fit">
            <div className="p-6 border-b border-slate-100 flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Top Performers</p>
                <h3 className="text-lg font-bold text-slate-900">Highest dev score</h3>
              </div>
              <Trophy size={20} className="text-amber-400" />
            </div>
            
            <div className="p-2 flex-1">
              {topPerformers.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm">Fetching live data...</div>
              ) : (
                topPerformers.map((student) => (
                  <div key={student.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
                    <span className="text-sm font-bold text-slate-300 group-hover:text-slate-400 transition-colors">{student.id}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{student.name}</p>
                      <p className="text-xs text-slate-500 truncate">{student.idNum} - {student.dept}</p>
                    </div>
                    <span className="text-lg font-black text-slate-900">{student.score}</span>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 mt-auto">
              {/* ---> UPDATED BUTTON <--- */}
              <button onClick={() => navigate('/students')} className="w-full py-2 text-xs font-bold tracking-widest text-slate-600 uppercase hover:text-slate-900 transition-colors">
                View All Students →
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}