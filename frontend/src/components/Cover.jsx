import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Cover = ({img, title, subtitle, href}) => {
  return (
    <div className='relative max-h-60 max-w-75 overflow-hidden group transition-all duration-300 ease-in-out hover:cursor-pointer rounded-lg '>
      <Link to={`/category${href}`}>
        <img src={img} alt={title} className='w-xs group-hover:scale-110 transition-all duration-300 ease-in-out -translate-y-20'/>
        <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/75 to-transparent h-full'/>
        <div className='absolute w-full p-4 h-full flex flex-col justify-end bottom-0 left-0'>
          <p className='font-bold '>{title}</p>
          <p className='text-xs text-gray-400 mt-0.5'>{subtitle} <ArrowRight className='inline group-hover:animate-pulse' size={13}/></p>
        </div>
      </Link>
    </div>
  )
}

export default Cover