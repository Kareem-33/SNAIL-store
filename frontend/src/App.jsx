import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { motion } from 'framer-motion'

import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import useAuthStore from './store/useAuthStore'
import { LoaderCircle } from 'lucide-react'
import DashboardPage from './pages/DashboardPage'
import { useProductStore } from './store/useProductStore'
import CategoryPage from './pages/CategoryPage'
import { useCartStore } from './store/useCartStore'
import CartPage from './pages/CartPage'
import { useCouponStore } from './store/useCouponStore'

function App() {
  const {user, checkingAuth, checkAuth} = useAuthStore();
  const {getProducts} = useProductStore();
  const {getCartItems} = useCartStore();
  const {getCoupons} = useCouponStore();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    checkAuth();
    getProducts();
    if(isAdmin){
      getCoupons();
    }
  }, [checkAuth])

  useEffect(() => {
    if(!user) return;
    getCartItems();
  }, [getCartItems, user])

  if(checkingAuth){
    return (
      <div className='min-h-screen bg-gray-900 flex items-center justify-center gap-x-2'>
        <motion.div
          className='bg-emerald-500 w-5 h-5 rounded-full'
          initial={{ y: 0 }}
          animate={{ y: ["1rem", "-1rem"], opacity: [0.25, 1], scale: [1, 1.25] }}
          transition={{ duration: 0.75, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
        <motion.div
          className='bg-emerald-500 w-5 h-5 rounded-full'
          initial={{ y: 0 }}
          animate={{ y: ["1rem", "-1rem"], opacity: [0.25, 1], scale: [1, 1.25] }}
          transition={{ duration: 0.75, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.2 }}
        />
        <motion.div
          className='bg-emerald-500 w-5 h-5 rounded-full'
          initial={{ y: 0 }}
          animate={{ y: ["1rem", "-1rem"], opacity: [0.25, 1], scale: [1, 1.25] }}
          transition={{ duration: 0.75, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.4 }}
        />
      </div>
    )
  }

    return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
      {/* Background gradient */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
        </div>
      </div>
      <div className='relative z-50 pt-20 not-sm:pt-30'>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={!user ? <SignupPage />  : <Navigate to={"/"}/> } />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"}/>} />
          <Route path="/admin-dashboard" element={isAdmin? <DashboardPage /> : <Navigate to={"/"}/>} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/cart" element={!user? <Navigate to={"/"}/> : <CartPage/>} />

          {/* TODO: implement 404 not found page */}
          {/* <Route path="*" element={<Navigate to={"/"}/>} />  */}
        </Routes>
      </div>
      <Toaster />
    </div>
  )
}

export default App
