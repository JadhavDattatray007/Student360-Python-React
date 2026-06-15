import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, BarChart3, FileText, LogOut } from 'lucide-react'

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    // GLASSMORPHISM APPLIED HERE: bg-white/40 and backdrop-blur-2xl
    <aside className="w-64 bg-white/40 backdrop-blur-2xl border-r border-white/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col justify-between shrink-0 h-full z-10">
      <div>
        <div className="p-6 border-b border-slate-200/50">
          <h1 className="text-xl font-bold flex items-center gap-2 text-slate-800 drop-shadow-sm">
            <span className="text-2xl drop-shadow-md">🎓</span> Student360
          </h1>
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-1">Admin Console</p>
        </div>
        
        <nav className="p-4 space-y-2">
          {/* Active Button with Glass Effect */}
          <button onClick={() => navigate('/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 bg-white/60 text-slate-900 rounded-xl font-semibold text-sm shadow-sm border border-white/50 backdrop-blur-md transition-all hover:shadow-md hover:bg-white/80">
            <LayoutDashboard size={18} /> Dashboard
          </button>
          
          {/* Inactive Buttons with soft hover effects */}
          <button onClick={() => navigate('/students')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-white/50 hover:text-slate-900 hover:shadow-sm hover:border-white/50 border border-transparent rounded-xl font-semibold text-sm transition-all">
            <Users size={18} /> Students
          </button>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-white/50 hover:text-slate-900 hover:shadow-sm hover:border-white/50 border border-transparent rounded-xl font-semibold text-sm transition-all">
            <BarChart3 size={18} /> Analytics
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-white/50 hover:text-slate-900 hover:shadow-sm hover:border-white/50 border border-transparent rounded-xl font-semibold text-sm transition-all">
            <FileText size={18} /> Reports
          </button>
        </nav>
      </div>

      <div className="p-4 border-t border-slate-200/50 bg-white/20">
        
        {/* ---> ADMIN PROFILE RESTORED & GLOSSY <--- */}
        <div className="px-4 py-3 mb-4 bg-white/40 rounded-xl border border-white/50 shadow-sm backdrop-blur-md">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Signed in as</p>
          <p className="text-sm font-semibold text-slate-800 truncate">admin@student360.edu</p>
        </div>

        {/* Glossy Logout Button */}
        <button 
          onClick={() => { localStorage.removeItem('isAuthenticated'); navigate('/'); }} 
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200/60 text-slate-600 rounded-xl hover:from-white hover:to-white hover:text-slate-900 hover:shadow-sm font-bold text-xs uppercase tracking-wider transition-all"
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </aside>
  )
}