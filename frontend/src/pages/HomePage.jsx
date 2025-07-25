import React from 'react'
import Cover from '../components/Cover'

const HomePage = () => {
  return (
    <div className='px-35 mt-6'>
      <div className='max-h-screen'>
        <div>
          <h2 className='text-emerald-400 font-bold text-3xl text-center'>Explore our categories</h2>
          <p className='text-center text-xs text-gray-300 mt-2'>discover the latest trends in eco-friendly fashion</p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-6 mx-auto max-w-fit'>
          <Cover img='shirts.jpg' title='Shirts' subtitle='Discover our Shirts' href='/shirts'/>
          <Cover img='jeans.jpg' title='Jeans' subtitle='Discover our Jeans' href='/jeans'/>
          <Cover img='shoes.jpg' title='Shoes' subtitle='Discover our Shoes' href='/shoes'/>
          <Cover img='glasses.png' title='Glasses' subtitle='Discover our Glasses' href='/glasses'/>
          <Cover img='jackets.jpg' title='Jackets' subtitle='Discover our Jackets' href='/jackets'/>
          <Cover img='suits.jpg' title='Suits' subtitle='Discover our Suits' href='/suits'/>
        </div>
      </div>
    </div>
  )
}

export default HomePage