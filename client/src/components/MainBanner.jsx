import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';

const MainBanner = () => {
  return (
    <div className='relative'>
      <img src={assets.main_banner_bg} alt="" className='w-full hidden md:block'/>
      <img src={assets.main_banner_bg_sm} alt="" className='w-full md:hidden' />
      <div className='absolute inset-0 px-4 md:pl-18 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 lg:pl-24'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight font-bold'>Freshness You Can Trust, Savings You Will Love!</h1>
  

      <div className='flex items-center mt-6 font-medium'>
        <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'>Order Now
        <img src={assets.white_arrow_icon} className='md:hidden transition group-focus:translate-x-1' alt="" />
        </Link>
        <Link to={"/products"} className=' text-gray-500 px-4 py-2 rounded-full mt-2'>Explore Top Deals
        <img src={assets.black_arrow_icon} className='md:hidden transition group-focus:translate-x-1' alt="" />
        </Link>
        </div>
            </div>
    </div>
  )
}

export default MainBanner;
