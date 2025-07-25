import { ChartLine, PlusCircle, ShoppingBasket, Tag } from 'lucide-react'
import { useState } from 'react';
import AddProduct from '../components/AddProduct';
import Products from '../components/Products';
import Analytics from '../components/Analytics';
import CouponsTab from '../components/CouponsTab';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem("activeTab") || "add");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  return (
    <div>
      <h2 className='text-emerald-400 font-bold text-3xl text-center my-6'>Admin Dashboard</h2>
      <div className='flex justify-center align-center text-sm text-gray-300 '>
        <button className={`flex gap-2 justify-center items-center px-4 py-2 rounded-l-xl border-r border-r-gray-600 transition-all duration-300 ease-in-out hover:cursor-pointer
          ${activeTab === "add" ? "bg-emerald-600 text-white font-bold px-8" : "bg-gray-700"}`}
          onClick={() => handleTabChange("add")}>
          <PlusCircle size={17} className='text-white-400 inline-block'/>
          <span className='text-white-400'>Add Product</span>
        </button>
        <button className={`flex gap-2 justify-center items-center px-4 py-2 transition-all duration-300 ease-in-out hover:cursor-pointer
          ${activeTab === "products" ? "bg-emerald-600 text-white font-bold px-8" : "bg-gray-700"}`}
          onClick={() => handleTabChange("products")}>
          <ShoppingBasket size={17} className='text-white-400 inline-block'/>
          <span className='text-white-400'>Products</span>
        </button>
        <button className={`flex gap-2 justify-center items-center px-4 py-2 border-l border-l-gray-600 transition-all duration-300 ease-in-out hover:cursor-pointer
          ${activeTab === "coupons" ? "bg-emerald-600 text-white font-bold px-8" : "bg-gray-700"}`}
          onClick={() => handleTabChange("coupons")}>
          <Tag size={17} className='text-white-400 inline-block'/>
          <span className='text-white-400'>Coupons</span>
        </button>
        <button className={`flex gap-2 justify-center items-center px-4 py-2 rounded-r-xl border-l border-l-gray-600 transition-all duration-300 ease-in-out hover:cursor-pointer
          ${activeTab === "analytics" ? "bg-emerald-600 text-white font-bold px-8" : "bg-gray-700"}`}
          onClick={() => handleTabChange("analytics")}>
          <ChartLine size={17} className='text-white-400 inline-block'/>
          <span className='text-white-400'>Analytics</span>
        </button>
      </div>
      <div className='my-6'>
        {activeTab === "add" && <AddProduct/>}
        {activeTab === "products" && <Products/>}
        {activeTab === "coupons" && <CouponsTab/>}
        {activeTab === "analytics" && <Analytics/>}
      </div>
    </div>
  )
}

export default DashboardPage