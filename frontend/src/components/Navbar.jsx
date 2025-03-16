import React from 'react'

import { NavLink } from 'react-router-dom'
import Button from './Button'
import { assets } from '../assets/assets_frontend/assets'
const Navbar = () => {
  return (
    <div className='flex items-center  justify-between text-sm text-black py-2 mb-3 ml-3 '>
      <img  className='w-44 cursor-pointer'src={assets.logo}alt="" srcset="" />
      <ul className="hidden md:flex items-start gap-17 -ml-47 mt-4  text-[18px] font-[00] ">

        <NavLink to='/'>
            <li>HOME</li>
            <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden'/>


        </NavLink>
        <NavLink to='/doctors'>
            <li>DOCTORS</li>
            <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden'/>




        </NavLink>
        <NavLink to='/travel'>
            <li>TRAVEL</li>
            <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden'/>




        </NavLink>
        <NavLink to='/about'>
            <li>ABOUT US</li>
            <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden'/>




        </NavLink>
        <NavLink to='contact'>
            <li>CONTACT</li>
            <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden'/>



        </NavLink>
      </ul>
      <div className="mr-5">
  <Button text="Login" />  
</div>

    </div>
  )
}

export default Navbar
