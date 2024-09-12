import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global/assets/css/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home/Home.tsx'
import ErrorNotFoundPage from './pages/error/notFoundPage/ErrorNotFoundPage.tsx'
import ProtectedRoute from './global/assets/utils/config/infra/ProtectedRoute.tsx'
import RegisterScreen from './pages/auth/register/RegisterScreen.tsx'
import LoginScreen from './pages/auth/login/LoginScreen.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={App} />,
    errorElement: <ErrorNotFoundPage />,
    children: [
      {
        path: "Home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth/register",
    element: <RegisterScreen />,
  },
  {
    path: "/auth/login",
    element: <LoginScreen />,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
