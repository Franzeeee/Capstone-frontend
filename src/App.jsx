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
import ClassLesson from './pages/Teacher/ClassLesson'
import LoadingPage from './pages/LoadingPage'
import Announcement from './pages/Announcement'
import ClassAssessment from './pages/ClassAssessment'
import NotFound from './pages/NotFound'
import Sample from './pages/Sample'


export const App = () => {
  return (
    <BrowserRouter>
        <Routes>

        <Route element={<ProtectedRoutes />} >
            <Route path="/playground" element={<CodeEditor />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path='/c/:code' element={<Class />} />
            <Route path='/c/:code/:lesson' element={<ClassLesson />}/>
            <Route path='/c/:code/a/:assessment' element={<ClassAssessment />} />
            <Route path='/announcements' element={<Announcement />} />
        </Route>
        
        <Route path="/" element={<Sample />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}
