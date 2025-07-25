import { ShoppingCart, X } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast'

import useAuthStore from "../store/useAuthStore";
import { useCartStore } from '../store/useCartStore';

const ProductCard = ({ id, image, title, description, price, stock, category, isFeatured }) => {
  const [showPopup, setShowPopup] = useState(false);
  const {user} = useAuthStore();
  const {addItemToCart} = useCartStore();

  const addToCart = () => {
    if(!user) {
      toast.error('Please login to add items to cart', {id: 'login-toast'});
    } else{
      addItemToCart({_id:id, image, title, description, price, stock, category});
    }
  }

  return (
    <>
      {/* Card */}
      <div
        key={id}
        className={`bg-gray-800 shadow-lg rounded-lg overflow-hidden flex flex-col w-full h-full max-w-xs group hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out relative ${isFeatured ? 'border-2 border-yellow-500' : ''}`}
      >
        <div className="flex flex-col w-full h-full" onClick={() => setShowPopup(true)}>
        {isFeatured && (
          <span className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs border border-black font-bold uppercase flex items-center justify-center">
            Featured
          </span>
        )}
        {stock <= 10 && stock > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs border border-black font-bold uppercase flex items-center justify-center">
            Low Stock: {stock}
          </span>
        )}
        {stock === 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs border border-black font-bold uppercase flex items-center justify-center">
            Out of Stock
          </span>
        )}
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-3 flex flex-col flex-grow">
          <h2 className="font-bold text-lg text-left line-clamp-1">{title}</h2>
          <p className="text-sm text-gray-400 text-left line-clamp-3 mb-2">
            {description}
          </p>

          <div className="flex justify-between items-center w-full mt-auto">
            <p className="bg-emerald-600/25 text-emerald-500 px-2 py-1 rounded-full text-xs border border-emerald-500 font-bold uppercase flex items-center justify-center">
              {category}
            </p>
            <p className="font-black text-xl">
              {price}
              <span className="text-xs text-gray-400 font-black ml-1">EGP</span>
            </p>
          </div>
          </div>
        </div>

        <button
          className="bg-emerald-600 text-white p-2 rounded flex items-center justify-center gap-2 font-bold hover:bg-emerald-700 transition-all duration-300 w-full mt-auto disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
          disabled={stock === 0}
          onClick={() => addToCart()}
        >
          <ShoppingCart size={20} />
          <span>Add to cart</span>
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 text-left"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-gray-800 text-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto relative shadow-2xl hide-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-100 hover:cursor-pointer"
              onClick={() => setShowPopup(false)}
            >
              <X />
            </button>

            {/* Full Image */}
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover rounded-t-lg"
            />

            {/* Details */}
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{title}</h2>
              <div className="flex justify-between items-center w-full mt-auto mb-2">
                <div className='flex gap-2'>
                  <p className="bg-emerald-600/25 text-emerald-500 px-2 py-1 rounded-full text-xs border border-emerald-500 font-bold uppercase flex items-center justify-center">
                    {category}
                  </p>
                  {isFeatured && (
                  <p className="bg-yellow-600/25 text-yellow-500 px-2 py-1 rounded-full text-xs border border-yellow-500 font-bold uppercase flex items-center justify-center">
                    Featured
                  </p>
                  )}
                  {stock <= 10 && (
                  <p className="bg-red-600/25 text-red-500 px-2 py-1 rounded-full text-xs border border-red-500 font-bold uppercase flex items-center justify-center">
                    Low stock: {stock}
                  </p>
                  )}
                  {stock === 0 && (
                  <p className="bg-red-600/25 text-red-500 px-2 py-1 rounded-full text-xs border border-red-500 font-bold uppercase flex items-center justify-center">
                    Out of stock
                  </p>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4 whitespace-pre-line border-b border-b-gray-700 pb-3">
                {description}
              </p>
              <div className="flex justify-between items-center w-full mt-auto">
                <p className="font-black text-3xl">
                  {price}
                  <span className="text-sm text-gray-400 font-black ml-1">EGP</span>
                </p>
                <button
                  className="bg-emerald-600 text-white p-2 rounded flex items-center justify-center gap-2 font-bold hover:bg-emerald-700 transition-all duration-300 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => addToCart(product)}
                  disabled={stock === 0}
                >
                  <ShoppingCart size={20} />
                  <span>Add to cart</span>
                </button>
              </div>
              </div>
            </div>
          </div>
      )}
    </>
  );
};

export default ProductCard;
