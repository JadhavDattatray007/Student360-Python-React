// We import the image directly from the assets folder!
import campusImage from '../assets/campus.jpg'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()
  return (
    <div className="flex min-h-screen">
      
      {/* Left Side - Branding & Background */}
      <div 
        className="hidden w-1/2 lg:flex flex-col justify-between p-16 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${campusImage})` }}
      >
        {/* This adds a frosted glass overlay so the text stays readable over the photo */}
        <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px]"></div> 
        
        {/* The z-10 makes sure the text sits ON TOP of the background overlay */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-3xl">🎓</span> Student360
            </h1>
          </div>
          
          <div>
            <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-4">
              Evaluation-Ready Platform
            </p>
            <h2 className="text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              One profile.<br/>Every dimension of growth.
            </h2>
            <p className="text-slate-600 mb-10 max-w-md leading-relaxed">
              Academics, certifications, projects, sports, leadership and NSS — unified into a single Student Development Score that reflects real-world readiness.
            </p>

            {/* The 3 Stat Cards */}
            <div className="flex gap-4">
              <div className="bg-white/80 p-4 rounded shadow-sm">
                <p className="text-2xl font-bold text-slate-900">40%</p>
                <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mt-1">Academics</p>
              </div>
              <div className="bg-white/80 p-4 rounded shadow-sm">
                <p className="text-2xl font-bold text-slate-900">20%</p>
                <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mt-1">Certs</p>
              </div>
              <div className="bg-white/80 p-4 rounded shadow-sm">
                <p className="text-2xl font-bold text-slate-900">15%</p>
                <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mt-1">Projects</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Right Side - Login Form Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">Sign In</p>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Welcome back.</h2>
          <p className="text-slate-500 mb-10">Use your admin credentials to access the console.</p>
          
          <form className="space-y-6">
            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-500 uppercase mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                placeholder="admin@student360.edu"
                className="w-full px-4 py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-500 uppercase mb-2">
                Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
              />
            </div>

          <button 
              type="button"
              onClick={() => navigate('/dashboard')}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded hover:bg-slate-800 transition-colors flex justify-center items-center gap-2"
            >
              Sign in <span>→</span>
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-slate-100">
            <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Demo Credentials</p>
            <p className="text-xs text-slate-500 font-mono">admin@student360.edu / admin123</p>
          </div>

        </div>
      </div>

    </div>
  )
}