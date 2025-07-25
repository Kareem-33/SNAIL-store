import React, { useEffect } from 'react'
import { useCartStore } from '../store/useCartStore';
import { ArrowRight, ShoppingCart, Trash2 } from 'lucide-react';
import CartItem from '../components/cartItem';
import OrderSummary from '../components/OrderSummary';
import {Link} from "react-router-dom"

const CartPage = () => {
  const {cart, clearCart} = useCartStore();
  const cartLength = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className='py-10 px-20'>
      {cart.length !== 0 ?
        <div className='display flex justify-between gap-10'>
          <div className='flex-1'>
            <div className='border-b border-b-gray-400/25 pb-4 flex justify-between items-end'>
              <div>
                <h2 className='flex gap-2 items-center text-3xl font-bold text-emerald-500'>
                  <ShoppingCart size={35}/>
                  Cart
                </h2>
                <p className='text-sm text-gray-400 mt-2'>there are {cartLength} items in your cart</p>
              </div>
              <button className='mt-3 text-sm text-white bg-red-600 px-5 py-2 rounded-md font-black flex align-center gap-2'
                onClick={clearCart}
              >
                <Trash2 size={18}/>
                Clear Cart
              </button>
            </div>
            <div className='flex flex-col gap-3 mt-3'>
              {cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>
          </div>
          <div className='max-w-[25%] w-[25%]'>
            <OrderSummary/>
          </div>
        </div>
        :
        <EmptyCartUI/>
      }
    </div>
  )
}

const EmptyCartUI = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex items-center gap-3 mb-3 font-bold'>
        <ShoppingCart size={35}/>
        <h1 className='text-3xl'>Cart is empty</h1>
      </div>
      <Link to={'/'} className='text-emerald-500 font-bold text-sm m-auto flex gap-2 items-center bg-gray-800 border border-gray-700 py-2 px-4 rounded-md'>back to home <ArrowRight size={16}/></Link>
    </div>
  )
}

export default CartPage