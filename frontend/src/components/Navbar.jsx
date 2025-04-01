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
      <img className="w-44 cursor-pointer" src={assets.logo} alt="Logo" />

      {/* Navigation Links */}
      <ul className="hidden md:flex items-start gap-10 ml-10 mt-4 text-[18px] font-medium">
        {["HOME", "DOCTORS", "TRAVEL", "ABOUT US", "CONTACT"].map((item, index) => (
          <NavLink key={index} to={`/${item.toLowerCase().replace(" ", "")}`}>
            <li className="cursor-pointer hover:text-blue-600">{item}</li>
          </NavLink>
        ))}
      </ul>

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

        {/* Uncomment Wallet if needed */}
        {/* <Wallet /> */}
      </div>
    </div>
  );
};

export default Navbar;
