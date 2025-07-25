import { Minus, Trash2, Plus } from 'lucide-react'
import React from 'react'
import { useCartStore } from '../store/useCartStore';

const CartItem = ({item}) => {
  const {removeItemFromCart, updateQuantity} = useCartStore();
  return (
    <div key={item._id} className='flex items-center gap-4 bg-gray-800 border border-gray-700 rounded-lg p-3 min-h-[140px]'>
      <img src={item.image} alt={item.title} className='w-32 h-32 object-cover rounded-lg hover:scale-125 transition-all duration-300 ease-in-out'/>
      <div className='flex-1'>
        <h3 className='text-lg font-bold line-clamp-1'>{item.title}</h3>
        <div className='flex items-center gap-2 py-2'>
          <p className="bg-emerald-600/25 text-emerald-500 px-2 py-1 rounded-full text-xs border border-emerald-500 font-bold uppercase flex items-center justify-center w-fit">
            {item.category}
          </p>
          {item.isFeatured && (
            <span className="bg-yellow-600/25 text-yellow-500 px-2 py-1 rounded-full text-xs border border-yellow-500 font-bold uppercase flex items-center justify-center w-fit">
              Featured
            </span>
          )}
        </div>
        <p className='line-clamp-1 text-gray-400 text-sm mb-2'>{item.description}</p>
      </div>
      <div className='flex flex-col items-center pr-6 '>
        <p className='text-2xl text-emerald-400 font-bold'>{item.price} <span className='text-xs text-gray-400'>EGP</span></p>
        <div className='flex items-center mt-2 w-full'>
          <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className='flex-1 text-white bg-gray-700 border-r border-gray-600 w-7 h-7 flex items-center justify-center rounded-tl-lg disabled:cursor-not-allowed disabled:opacity-50' disabled={item.quantity === 1}><Minus size={15}/></button>
          <span className='flex-1 text-gray-300 bg-gray-700 w-7 h-7 flex items-center justify-center border-y border-gray-600'>{item.quantity}</span>
          <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className='flex-1 text-white bg-gray-700 w-7 h-7 border-l border-gray-600 flex items-center justify-center rounded-tr-lg disabled:cursor-not-allowed disabled:opacity-50' disabled={item.quantity === item.stock}><Plus size={15} /></button>
        </div>
        <button onClick={() => removeItemFromCart(item._id)} className='text-white hover:bg-red-700/25 hover:cursor-pointer transition duration-300 ease-in-out flex justify-center items-center gap-2 bg-red-600/25 rounded-b-lg py-2 w-full'>
          <Trash2 className='w-5 h-5'/>
        </button>
      </div>
    </div>
  )
}

export default CartItem