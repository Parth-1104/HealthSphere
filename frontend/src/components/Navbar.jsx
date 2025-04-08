import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from './Button';
import { assets } from '../assets/assets_frontend/assets';
// import Wallet from './Wallet';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm text-black py-2 mb-3 ml-3">
      {/* Logo */}
      <img onClick={()=> navigate('/')} className="w-44 cursor-pointer" src={assets.logo} alt="Logo" />
      <ul className="hidden md:flex items-start gap-6 text-[20px] py-4 mt-3">
  {[
    { name: "HOME", path: "/" },
    { name: "All Doctors", path: "/doctors" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ].map((item, index) => (
    <NavLink key={index} to={item.path} className="group">
      <li className="relative cursor-pointer text-gray-700 hover:text-blue-600 transition duration-300">
        {item.name}
        <hr className="w-0 group-hover:w-full border-t-2 border-blue-600 transition-all duration-300 mt-1" />
      </li>
    </NavLink>
  ))}
</ul>

      {/* Navigation Links */}
    

      {/* Right Section */}
      <div className="mr-5 flex items-center gap-5">
        {/* Conditional Rendering for Token */}
        {token ? (
          <div className='flex ite-centre gap-3 cursor-pointer group relative' >
            <img className='w-8 rounded-full' src={assets.profile_pic} alt=''/>
            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
            <div className='absolute top-0 right-0 p-14 text-black z-20 font-medium hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={()=>navigate('my-profile')} className='hover:text-blue-400 cursor-pointer'>My Profile</p>
                <p onClick={()=>navigate('my-appointment')}className='hover:text-blue-400 cursor-pointer'>My Appointments</p>
                <p onClick={()=>setToken(false)} className='hover:text-blue-400 cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <Button text="Login" onClick={() => navigate('/login')} />
        )}
        <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
        {/*---moblie---*/}
        <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt="" />
            <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 px-5 text-lg font-medium'>
            <NavLink  onClick={()=>setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
            <NavLink  onClick={()=>setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
            <NavLink  onClick={()=>setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
            <NavLink  onClick={()=>setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
          </ul>
        </div>

        {/* Uncomment Wallet if needed */}
        {/* <Wallet /> */}
      </div>
    </div>
  );
};

export default Navbar;
