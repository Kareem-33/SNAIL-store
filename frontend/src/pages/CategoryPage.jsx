import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const {products, getProductsByCategory} = useProductStore();
  const { category } = useParams();

  useEffect(() => {
    getProductsByCategory(category);
  }, [getProductsByCategory, category]);

  return (
    <div className='mt-6 text-left px-12'>
      <h1 className='text-4xl text-emerald-500 font-black uppercase'>{category} products</h1>
      <p className='font-bold text-gray-400 text-sm border-b border-b-gray-400/25 pb-3'>{products?.length} products</p>
      <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 py-6'>
        {products.length !== 0 && products?.map((product) => (
            <ProductCard key={product._id} id={product._id} {...product} />
        ))}
      </div>
      {products.length === 0 &&
        <div className='w-full'>
          <p className='text-center text-gray-400 font-bold text-xl bg-gray-800 p-3 w-fit m-auto px-10 rounded-lg'>No products found in category <span className='capitalize'>{category}</span></p>
          <p className='text-center mt-2'><Link className='text-emerald-500 font-bold text-sm m-auto ' to={'/'}>back to home?</Link></p>
        </div>
      }
    </div>
  )
}

export default CategoryPage