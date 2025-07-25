import { Link } from 'react-router-dom'
import { Bubbles, Lock, LogInIcon, LogOutIcon, ShoppingCart, Snail, Sparkles, UserPlus } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'
import { useCartStore } from '../store/useCartStore';
import { useEffect } from 'react';

const Navbar = () => {
  const {user, logout} = useAuthStore();
  const {cart} = useCartStore();
  const isAdmin = user?.role === 'admin';

  return (
    <header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md z-40 shadow-lg
    transition-all duration-300 border-b border-emerald-800'>
      <div className="container mx-auto px-4 py-4">
        <div className='flex flex-wrap justify-between items-center not-sm:justify-center not-sm:flex-col not-sm:gap-2 '>
          <Link to='/' className='text-2xl font-black text-emerald-400 items-center space-x-2 flex group hover:opacity-80 transition-all duration-300'>
            <div className='bg-emerald-600/25 p-2 rounded-full'>
              <Snail className='' size={25}/>
            </div>
            <div className='flex align-top gap-x-1'>
              <span className=''>SNAIL</span>
              <span className='text-gray-400 text-sm font-bold'>store</span>
            </div>
          </Link>

          <nav className='flex flex-wrap items-center not-sm:justify-center gap-4'>
            <Link to={"/"} className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'>Home</Link>
            {user && (
              <Link to={"/cart"} className='relative group text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'>
                <ShoppingCart className='inline-block mr-1' size={20}/>
                <span className='hidden sm:inline'>Cart</span>
                <span
                  className='absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 
                  text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out'>
                  {cart.map((item) => item.quantity).reduce((a, b) => a + b, 0)}
                </span>
              </Link>
            )}
            {isAdmin && (
              <Link
                className='bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-normal
                  transition duration-300 ease-in-out flex items-center'
                to={"/admin-dashboard"}
              >
                <Lock className='inline-block mr-1' size={18} />
                <span className='hidden sm:inline'>Dashboard</span>
              </Link>
            )}
            {user ? (
                <button
                  className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
              rounded-md flex items-center transition duration-300 ease-in-out hover:cursor-pointer'
                  onClick={logout}
                >
                  <LogOutIcon size={18} className=''/>
                  <span className='hidden sm:inline ml-2'>Logout</span>
                </button>
              ) : (
                <>
                  <Link
                    to={"/signup"}
                    className='bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 
                    rounded-md flex items-center transition duration-300 ease-in-out'
                  >
                    <UserPlus className='mr-2 not-sm:hidden' size={18} />
                    Signup
                  </Link>
                  <Link
                    to={"/login"}
                    className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
                    rounded-md flex items-center transition duration-300 ease-in-out'
                  >
                    <LogInIcon className='mr-2 not-sm:hidden' size={18} />
                    Login
                  </Link>
                </>
              )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar