import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { useDispatch } from 'react-redux'
import { checkAuth } from './features/authSlice'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import Index from './pages/Index'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("checkAuth call hua frontend se");
    dispatch(checkAuth());
    // toast.success("yes");
  }, [dispatch]);

  return (
    <div>
      {/* ✅ Only one Toaster */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      </Routes>
    </div>
  );
}

export default App;
