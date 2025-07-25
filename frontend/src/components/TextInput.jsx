import React from 'react'
import { DynamicIcon } from 'lucide-react/dynamic';

const TextInput = ({label, icon, placeholder, type, setFormData, formData, name}) => {
  return (
    <div className='w-full flex flex-col'>
      <label htmlFor={label} className='mb-1 text-gray-300 font-bold text-sm'>{label}</label>
      <div className='flex items-center border border-gray-600 rounded-md px-4 py-2 bg-gray-700'>
        <DynamicIcon name={icon} size={20} className='text-gray-400 mr-3'/>
        <input
          type={type}
          placeholder={placeholder}
          className='w-full focus:outline-none focus:border-none'
          id={label}
          value={formData[name]}
          onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        />
      </div>
    </div>
  )
}

export default TextInput