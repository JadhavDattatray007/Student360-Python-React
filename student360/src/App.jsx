import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students' // <-- Add this import!

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} /> {/* <-- Add this route! */}
      </Routes>
    </BrowserRouter>
  )
}

export default App