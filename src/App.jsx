
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Landing from './pages/user/Landing'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />

      
    </Routes>
    </BrowserRouter>
  )
}

export default App
