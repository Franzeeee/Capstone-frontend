import React from "react";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import CodeEditor from "./pages/CodeEditor";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Routes providers
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import Class from "./pages/Teacher/Class";
import ClassLesson from "./pages/Teacher/ClassLesson";
import LoadingPage from "./pages/LoadingPage";
import Announcement from "./pages/Announcement";
import ClassAssessment from "./pages/ClassAssessment";
import NotFound from "./pages/NotFound";
import Sample from "./pages/Sample";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import Testing from "./pages/Testing";
import TeacherAssessmentPage from "./pages/TeacherAssessmentPage";
import ClassDashboard from "./pages/ClassesPage/ClassDashboard";
import Submissions from "./pages/ClassesPage/Submissions";
import ClassGradeList from "./pages/ClassGradeList";
import ClassGradeTable from "./pages/ClassGradeTable";
import RefetchUser from "./components/RefetchUser";
import Certificate from "./pages/Certificate";
import Grades from "./pages/Student/Grades";
import Lesson1 from "./pages/LogicLessons/Lesson1";

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
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/profile" element={<Profile />}/>
            <Route path="/teacher/classes" element={<TeacherAssessmentPage />}/>
            <Route path="/teacher/classes/:code/dashboard" element={<ClassDashboard />} />
            <Route path="/teacher/classes/:code/dashboard/:activity/submissions" element={<Submissions />} />
            <Route path="/teacher/grades/class" element={<ClassGradeList />}/>
            <Route path="/teacher/grades/class/:code/final-grades" element={<ClassGradeTable />}/>
            <Route path="/verify-email" element={<RefetchUser />} />
            <Route path="/grades" element={<Grades />} />

            <Route path="/lesson1" element={<Lesson1 />} />

        </Route>
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/" element={<Sample />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound/>} />

        <Route path="/load" element={<LoadingPage />} />

      </Routes>
    </BrowserRouter>
  );
};
