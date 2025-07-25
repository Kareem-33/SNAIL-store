import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useProductStore } from '../store/useProductStore'
import { LoaderCircle, Star, Trash, Trash2 } from 'lucide-react';

const Products = () => {
  const {loading, products, toggleFeaturedProduct, deleteProduct, getProducts} = useProductStore();
  const [zoomed, setZoomed] = useState('');

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <motion.div
      className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <table className=' min-w-full divide-y divide-gray-700 rounded-xl'>
        <thead className='bg-gray-700 w-full'>
          <tr>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Product
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Price
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Stock
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Category
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Featured
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='bg-gray-800 divide-y divide-gray-700'>
          {products ? products?.map((product) => (
            <tr key={product._id} className={`${product.stock <= 10 ? "bg-red-600/10 hover:bg-red-600/20" : "hover:bg-emerald-600/10"}`}>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0 h-10 w-10'>
                    <img
                      className='h-10 w-10 rounded-full object-cover hover:cursor-pointer hover:scale-150 transition-all duration-300 ease-in-out'
                      src={product.image}
                      alt={product.title}
                      onClick={() => setZoomed(product._id)}
                    />
                    {zoomed === product._id && (
                      <div
                        className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'
                        onClick={() => setZoomed("")}
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className='max-w-[90%] max-h-[90%] object-contain rounded shadow-lg transition-transform duration-300'
                        />
                      </div>
                    )}
                  </div>
                  <div className='ml-4'>
                    <div
                      className='text-sm font-medium text-white max-w-[180px] truncate'
                      title={product.title}
                    >
                      {product.title}
                    </div>
                  </div>
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-300'>{typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'} <span className='text-xs text-gray-500 font-bold'>EGP</span></div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-300'>{product.stock}</div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-300'>{product.category}</div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`p-1 rounded-full ${
                    product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"
                  } hover:scale-120 hover: cursor-pointer duration-300 transition-all`}
                >
                  <Star className='h-5 w-5' />
                </button>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className='bg-red-800 border border-red-400 rounded-full p-1 hover:scale-120 hover:cursor-pointer duration-300 transition-all text-gray-300'
                >
                  <Trash2 className='h-5 w-5' />
                </button>
              </td>
            </tr>
          )):
          <tr>
            <td>No Products found</td>
          </tr>
          }
        </tbody>
      </table>
      {/* {loading && (
        <div
          className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'
        >
          <LoaderCircle size={35} className='text-white-400 inline-block animate-spin'/>
        </div>
      )} */}
    </ motion.div>
  )
}

export default Products