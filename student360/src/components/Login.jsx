import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  
  // 1. STATE BUCKETS FOR OUR FORM
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // 2. THE SECURITY CHECK
  const handleLogin = (e) => {
    e.preventDefault() // Stop page from refreshing
    
    // Hardcoded admin credentials for Version 1
    if (email === 'admin@student360.edu' && password === 'admin123') {
      // Give them the VIP Pass!
      localStorage.setItem('isAuthenticated', 'true')
      navigate('/dashboard')
    } else {
      // Deny entry
      setError('Invalid email or password.')
    }
  }

  return (
    <div className="flex h-screen bg-white font-sans">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex w-1/2 bg-slate-50 flex-col justify-center px-20 border-r border-slate-200">
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2 mb-12">
            <span className="text-3xl">🎓</span> Student360
          </h1>
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-4">Evaluation-Ready Platform</p>
          <h2 className="text-5xl font-black tracking-tight text-slate-900 leading-[1.1] mb-6">
            One profile.<br />Every dimension of<br />growth.
          </h2>
          <p className="text-slate-500 max-w-md text-sm leading-relaxed">
            Academics, certifications, projects, sports, leadership and NSS — unified into a single Student Development Score that reflects real-world readiness.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-20">
        <div className="w-full max-w-md mx-auto">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Sign In</p>
          <h3 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome back.</h3>
          <p className="text-slate-500 text-sm mb-8">Use your admin credentials to access the console.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition-colors"
                placeholder="admin@student360.edu"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition-colors"
                placeholder="••••••••"
              />
            </div>
            
            {/* Show error message if they type the wrong password */}
            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}

            <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 px-4 rounded hover:bg-slate-800 transition-colors mt-4">
              Sign In →
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100">
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Demo Credentials</p>
            <p className="text-xs text-slate-500 font-mono">admin@student360.edu / admin123</p>
          </div>
        </div>
      </div>
    </div>
  )
}