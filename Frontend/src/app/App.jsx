import React, { useEffect } from 'react'
import './App.css'
import { RouterProvider } from 'react-router'
import routes from './app.routes'
import useAuth from '../features/auth/hooks/useAuth.js'
import { useSelector } from 'react-redux'
import { ThemeProvider } from '../shared/context/ThemeContext.jsx'

const App = () => {
  const { handleGetMe } = useAuth();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <ThemeProvider>
      <RouterProvider router={routes} />
    </ThemeProvider>
  )
}

export default App