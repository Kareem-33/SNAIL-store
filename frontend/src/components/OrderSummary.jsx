import { CreditCard, ShoppingBag, X } from 'lucide-react'
import React from 'react'
import { useCartStore } from '../store/useCartStore';

const OrderSummary = () => {
  const {subTotal, total, couponApplied, coupon, applyCoupon, removeCoupon, createOrder, clearCart} = useCartStore();

  const [couponCode, setCouponCode] = React.useState('');

  const handleOrderCreation = () => {
      createOrder();
      clearCart();
  }

  return (
    <div className='bg-gray-800 rounded-lg p-4 border-gray-700 border'>
      <h3 className='text-xl font-bold text-emerald-400 mb-3'>Order Summary</h3>
      <div className=''>
        <div className='pb-4 border-b border-gray-400'>
          <div className='flex justify-between items-center text-gray-300 pb-2'>
            <p>Original price:</p>
            <span className='font-bold text-white'>{subTotal} <span className='text-xs text-gray-400'>EGP</span></span>
          </div>
          {couponApplied && (
            <div className='flex justify-between items-center text-red-400'>
              <p>Discount:</p>
              <span className='font-bold'>-{coupon.discountPercentage / 100 * subTotal}<span className='text-xs'>EGP</span></span>
            </div>
          )}
        </div>
        <div className='flex justify-between items-center text-white py-3 font-bold'>
          <p>Total:</p>
          <span className='text-xl text-emerald-300'>{total} <span className='text-xs text-gray-400'>EGP</span></span>
        </div>
        <button className='w-full font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition duration-300 ease-in-out py-2 rounded-lg cursor-pointer'
          onClick={() => handleOrderCreation()}
        >
          Proceed to Checkout
        </button>
      </div>
      {/* TODO: Complete the discount logic */}
      <div className='mt-6'>
        <div className='space-y-3'>
          <p className='text-xs text-gray-300 my-2'>Do you have a voucher or gift card?</p>
          <input type="text" className='bg-gray-700 border border-gray-600 rounded-md p-2 w-full text-sm disabled:opacity-50 disabled:cursor-not-allowed' disabled={couponApplied} value={couponCode} onChange={(e) => setCouponCode(e.target.value)}/>
          <button className='w-full font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition duration-300 ease-in-out py-2 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={() => applyCoupon(couponCode)}
            disabled={couponApplied}
          >
            Apply Code
          </button>
        </div>
        {couponApplied && (
          <div className='mt-3'>
            <p className='text-xs text-gray-300'>applied code:</p>
            <div className='flex justify-between items-center border-gray-700 border p-2 mt-1 rounded-md'>
              <span className='line-clamp-1'>
                {coupon.code} - {coupon.discountPercentage}%
              </span>
              <X size={20} className='text-red-500 cursor-pointer' onClick={() => removeCoupon()}/>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderSummary