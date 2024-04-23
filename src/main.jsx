import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { Register } from './pages/Register.jsx';
import { Login } from './pages/Login.jsx';
import CodeEditor from './pages/CodeEditor.jsx';
import { Home } from './pages/Home.jsx';
import Sample from './pages/Sample.jsx';
import { App } from './App.jsx';

// const router = createBrowserRouter([
//   {
//     path: '/register',
//     element: <Register />
//   },
//   {
//     path: '/login',
//     element: <Login />
//   },
//   {
//     path: '/code-editor',
//     element: <CodeEditor />
//   },
//   {
//     path: "/",
//     element: <Home />
//   },
//   {
//     path: '/sample',
//     element: <Sample />
//   }
// ])


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <App />
  //</React.StrictMode>,
)
