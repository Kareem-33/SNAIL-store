import { useState } from 'react';
import { LoaderCircle, PlusCircle, Trash2, Upload, X, XCircleIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = ["jeans", "shirts", "shoes", "glasses", "jackets", "suits"];

import { useRef } from 'react';
import { set } from 'mongoose';
import { useProductStore } from '../store/useProductStore';

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null,
  });

  const {loading, createProduct} = useProductStore();

  const imageInputRef = useRef(null);
  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if(name === 'image'){
      const file = files[0];
      if(file){
        const reader = new FileReader();
        reader.onloadend = () => {
          setProduct({...product, image: reader.result});
        }
        reader.readAsDataURL(file);
      }
    } else {
      setProduct(prev => ({
        ...prev,
        [name]: type === 'file' ? files[0] : value
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(product);
      if(res === 1) return;
      setProduct({
        title: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: null,
      })
    } catch (error) {
      console.log(`error while creating product: ${error}`);
    }

  };

  return (
    <motion.div className='p-5 bg-gray-800 sm:w-150 w-[85%] h-fit mx-auto rounded-xl border border-gray-700'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <h2 className='text-emerald-300 text-lg font-bold border-b border-b-gray-700 pb-3'>Create new product</h2>
      <form onSubmit={handleSubmit}>
        <div className='mt-2'>
          <label htmlFor="title" className='text-xs text-gray-400 font-bold'>Product title</label>
          <input
            type="text"
            name="title"
            id="title"
            className='bg-gray-700 border border-gray-600 rounded-sm w-full px-2 py-1 mt-1'
            value={product.title}
            onChange={handleChange}
          />
        </div>
        <div className='mt-2'>
          <label htmlFor="description" className='text-xs text-gray-400 font-bold'>Description</label>
          <textarea
            name="description"
            id="description"
            className='bg-gray-700 border border-gray-600 rounded-sm w-full px-2 py-1 mt-1 max-h-30 h-30 min-h-9'
            value={product.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className='mt-2'>
          <label htmlFor="price" className='text-xs text-gray-400 font-bold'>Price</label>
          <div className='relative flex items-center justify-center'>
            <input
              type="number"
              name="price"
              id="price"
              className='bg-gray-700 border border-gray-600 rounded-sm w-full px-2 py-1 mt-1 appearance-none'
              onWheel={(e) => e.target.blur()}
              value={product.price}
              onChange={handleChange}
            />
            <span className='text-gray-400 font-black ml-2'>EGP</span>
          </div>
        </div>
        <div className='mt-2'>
          <label htmlFor="category" className='text-xs text-gray-400 font-bold'>Category</label>
          <select
            name="category"
            id="category"
            className='bg-gray-700 border border-gray-600 rounded-sm w-full px-2 py-1.5 mt-1'
            value={product.category}
            onChange={handleChange}
          >
            <option value="" disabled>Select category</option>
            {categories.map((category, index) => <option key={index} value={category}>{category}</option>)}
          </select>
        </div>
        <div className='mt-2'>
          <label htmlFor="stock" className='text-xs text-gray-400 font-bold'>Count in stock</label>
          <input
            type="number"
            name="stock"
            id="stock"
            className='bg-gray-700 border border-gray-600 rounded-sm w-full px-2 py-1 mt-1'
            onWheel={(e) => e.target.blur()}
            value={product.stock}
            onChange={handleChange}
          />
        </div>
        <div className='mt-5 flex justify-left items-center gap-5'>
          <label htmlFor="image" className='bg-gray-700 border border-gray-600 rounded-sm w-fit px-4 py-2 text-sm flex justify-center items-center gap-2 hover:cursor-pointer transition-all duration-300 hover:gap-5'>
            <Upload size={19} className='inline-block'/>
            <div className='flex flex-col items-center justify-center relative'>
              <span className=''>Upload Image</span>
            </div>
          </label>
          {product.image && <span className='text-sm bg-gray-700 border border-gray-600 rounded-sm flex-1 py-2 px-2 flex justify-between items-center overflow-hidden'>
            <span className='text-gray-400 max-w-full overflow-hidden mr-1 flex-1'>{imageInputRef.current.files[0].name}</span>
            <button
              className='hover:cursor-pointer'
              onClick={(e) => {
                e.preventDefault();
                setProduct({ ...product, image: null });
                if (imageInputRef.current) imageInputRef.current.value = '';
              }}
            >
              <X size={18} className='text-red-600'/>
            </button>
          </span>}
          <input
            type="file"
            name="image"
            id="image"
            className='hidden'
            onChange={handleChange}
            ref={imageInputRef}
          />
        </div>
        <span className='text-gray-400 text-xs display-block'>max 20mb *</span>
        <button className='mt-3 bg-emerald-600 text-white w-full py-2 rounded-sm flex justify-center items-center gap-2 hover:cursor-pointer hover:bg-emerald-700 transition-all duration-300 disabled:cursor-not-allowed disabled:hover:bg-emerald-600 disabled:opacity-50' disabled={loading}>
          {loading?
            <><LoaderCircle size={19} className='animate-spin inline-block'/><p>Creating Product...</p></>:
            <><PlusCircle size={19} className=' inline-block'/><p>Create Product</p></>
            }
        </button>
      </form>
    </motion.div>
  )
}

export default AddProduct