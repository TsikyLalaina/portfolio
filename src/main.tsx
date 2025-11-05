import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppShell from './AppShell'
import Home from './pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProjectPage } from './pages/ProjectPage'

const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/project/:id', element: <ProjectPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
