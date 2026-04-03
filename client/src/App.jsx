import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './assets/pages/Login'
import SignUp from './assets/pages/Signup'

import Footer from './assets/components/Footer'
import Header from './assets/components/Header'
import Dashboard from './assets/pages/Dashboard'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={localStorage.getItem('token') ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>)
}

export default App