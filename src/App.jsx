import React from 'react'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import CodeEditor from './pages/CodeEditor'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Routes providers
import { ProtectedRoutes } from './routes/ProtectedRoutes'
import Class from './pages/Teacher/Class'


export const App = () => {
  return (
    <BrowserRouter>
        <Routes>

        <Route element={<ProtectedRoutes />} >
            <Route path="/playground" element={<CodeEditor />} />
            <Route path="/" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/c/:code' element={<Class />} />
      </Routes>
    </BrowserRouter>
  )
}
