import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'

// ---> THE SECURITY GUARD <---
// This intercepts the user. If they don't have the VIP pass, it kicks them back to the login page!
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  if (!isAuthenticated) {
    return <Navigate to="/" />
  }
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* We wrap our sensitive pages in the Security Guard */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/students" element={
          <ProtectedRoute>
            <Students />
          </ProtectedRoute>
        } />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App