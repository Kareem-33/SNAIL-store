import React, { use, useEffect, useState } from 'react'
import {motion} from 'framer-motion'

import {useCouponStore} from '../store/useCouponStore'
import { Calendar, LoaderCircle, PlusCircle, Tag, Ticket, Trash, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const CouponsTab = () => {
  const {coupons, loading, createCoupon, getCoupons, deleteCoupon} = useCouponStore();

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountPercentage: 0,
    expirationDate: new Date(),
    isActive: true,
  });

  useEffect(() => {
    getCoupons()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!newCoupon.code || !newCoupon.discountPercentage || !newCoupon.expirationDate) return toast.error('Please fill all the fields');
    try {
      await createCoupon(newCoupon);
      setNewCoupon({
        code: '',
        discountPercentage: 0,
        expirationDate: new Date(),
        isActive: true,
      })
    } catch (error) {
      console.log(`error while creating coupon: ${error}`);
    }
  }

  return (
    <motion.div className='p-5 bg-gray-800 sm:w-150 w-[85%] h-fit mx-auto rounded-xl border border-gray-700'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <h2 className='text-emerald-300 text-lg font-bold border-b border-b-gray-700 pb-3'>Create new coupon</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className='flex items-center gap-3'>
          <div className='mt-2 flex-1'>
            <label htmlFor="code" className='text-xs text-gray-400 font-bold'>Code <span className='text-red-600/75 text-right w-full'>(max 15 characters)</span></label>
            <input
              type="text"
              name="code"
              id="code"
              maxLength={15}
              className='bg-gray-700 border border-gray-600 rounded-sm w-full px-2 py-1 mt-1'
              value={newCoupon.code}
              onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
            />
          </div>
          <div className='mt-2 w-[25%]'>
            <label htmlFor="discount" className='text-xs text-gray-400 font-bold'>Discount Percentage</label>
            <div className='relative flex items-center justify-center'>
              <input
                type="number"
                name="discount"
                id="discount"
                className='bg-gray-700 border border-gray-600 rounded-sm w-full px-2 py-1 mt-1 appearance-none'
                onWheel={(e) => e.target.blur()}
                value={newCoupon.discountPercentage}
                onChange={(e) => setNewCoupon({ ...newCoupon, discountPercentage: e.target.value })}
              />
              <span className='text-gray-400 font-black ml-2'>%</span>
            </div>
          </div>
        </div>
        <div className='flex items-end gap-3'>
          <div className='mt-2 flex-1'>
            <label htmlFor="expiration" className='text-xs text-gray-400 font-bold'>Expiration Date</label>
            <div className='relative flex items-center justify-center'>
              <input
                type="date"
                name="expiration"
                id="expiration"
                className='bg-gray-700 border border-gray-600 rounded-sm w-full px-2 py-1 mt-1 appearance-none'
                onWheel={(e) => e.target.blur()}
                value={newCoupon.expirationDate}
                onChange={(e) => setNewCoupon({ ...newCoupon, expirationDate: e.target.value })}
                />
            </div>
          </div>
          <div className='mt-2 w-[25%]'>
            <label htmlFor="active" className='text-xs text-gray-400 font-bold display flex items-center justify-center gap-4'>
              Active
              <div className='w-12 h-6 bg-gray-700 border-none rounded-full flex items-center relative'>
                <div
                  className={`w-6 h-6 rounded-full transition-all duration-300 ease-in-out absolute top-0 ${newCoupon.isActive ? 'left-6 bg-emerald-500' : 'left-0 bg-red-700'}`}
                />
              </div>
            </label>
            <div className='relative flex items-center justify-center'>
              <input
                type="checkbox"
                name="active"
                id="active"
                hidden
                onWheel={(e) => e.target.blur()}
                value={newCoupon.isActive}
                onChange={(e) => setNewCoupon({ ...newCoupon, isActive: !newCoupon.isActive })}
              />
            </div>
          </div>
        </div>
        <button type='submit' className='mt-6 bg-emerald-600 text-white w-full py-2 rounded-sm flex justify-center items-center gap-2 hover:cursor-pointer hover:bg-emerald-700 transition-all duration-300 disabled:cursor-not-allowed disabled:hover:bg-emerald-600 disabled:opacity-50' disabled={loading}>
          {loading?
            <><LoaderCircle size={19} className='animate-spin inline-block'/><p>Creating Coupon...</p></>:
            <><PlusCircle size={19} className=' inline-block'/><p>Create Coupon</p></>
            }
        </button>
      </form>
      <div>
        {coupons.length > 0 && (
          <div className='mt-6'>
            <h2 className='text-emerald-300 text-lg font-bold border-b border-b-gray-700 pb-3'>Available coupons</h2>
            <div className='flex flex-col gap-3 pt-5'>
              {coupons.map((coupon) => (
                <div className='bg-gray-700 rounded-lg p-3 flex items-center justify-between'>
                  <div className='flex items-center'>
                    <p className='font-bold text-gray-300 text-lg bg-gray-800 border-gray-600 border px-2 rounded-l-md flex items-center gap-2'>
                      <Ticket size={20} className=''/>
                      {coupon.code}
                    </p>
                    <p className='font-bold text-gray-300 text-lg bg-gray-800 border-gray-600 border border-l-0 px-2 rounded-r-md flex items-center gap-2'>{coupon.discountPercentage}%</p>
                  </div>
                  <div className='flex items-center gap-3'>
                  <p className='text-sm text-gray-300 bg-gray-800 border border-gray-600 px-2 py-1 rounded-full flex items-center gap-2'>
                    <Calendar size={15} className=''/>
                    {coupon.expirationDate.split('T')[0].split('-').reverse().join(' / ')}
                  </p>
                  <p className={`px-3 py-1 rounded-full border font-bold text-sm ${coupon.isActive ? 'text-emerald-500 bg-emerald-600/25' : 'bg-red-600/25 text-red-500'}`}>{coupon.isActive ? 'Active' : 'Inactive'}</p>
                  <button
                    onClick={() => deleteCoupon(coupon._id)}
                    className='flex items-center justify-center'
                  >
                    <Trash2 size={20} className='text-red-600 hover:text-red-500 transition-all duration-300 ease-in-out hover:cursor-pointer'/>
                  </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default CouponsTab