import Sidebar from './Sidebar'

export default function Layout({ children }) {
  return (
    // We added a beautiful macOS-style soft gradient background here!
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-cyan-100 text-slate-900 font-sans overflow-hidden">
      
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 relative z-0">
        {/* This creates a subtle glossy shine at the top of the screen */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white/60 to-transparent pointer-events-none -z-10" />
        
        {children}
      </main>
      
    </div>
  )
}