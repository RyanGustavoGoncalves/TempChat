import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global/assets/css/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorNotFoundPage from './pages/error/notFoundPage/ErrorNotFoundPage.tsx'
import ProtectedRoute from './global/assets/utils/config/infra/ProtectedRoute.tsx'
import RegisterScreen from './pages/auth/register/RegisterScreen.tsx'
import LoginScreen from './pages/auth/login/LoginScreen.tsx'
import { ThemeProvider } from './components/ThemeProviderContext.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import HomePage from './pages/home/Home.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={App} />,
    errorElement: <ErrorNotFoundPage />,
    children: [
      {
        path: "Home",
        element: <HomePage />,
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
    <ThemeProvider storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster closeButton={true} richColors visibleToasts={5} expand={false} />
    </ThemeProvider>
  </React.StrictMode>,
)
