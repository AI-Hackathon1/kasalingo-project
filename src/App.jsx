
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Landing from './pages/user/Landing'

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>}>

      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
