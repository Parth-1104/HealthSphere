import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './Button';
import { assets } from '../assets/assets_frontend/assets';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  const navAnimation = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const menuItemAnimation = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "All Doctors", path: "/doctors" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={navAnimation}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm py-4 px-4">
        {/* Logo */}
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => navigate('/')} 
          className="w-44 cursor-pointer" 
          src={assets.logo} 
          alt="Logo" 
        />

        {/* Desktop Navigation */}
        <motion.ul 
          className="hidden md:flex items-center gap-8 text-[18px]"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {navItems.map((item, index) => (
            <motion.div key={index} variants={menuItemAnimation}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => `group ${isActive ? 'text-blue-600' : 'text-gray-700'}`}
              >
                <li className="relative cursor-pointer hover:text-blue-600 transition duration-300">
                  {item.name}
                  <motion.hr 
                    className="border-t-2 border-blue-400"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </li>
              </NavLink>
            </motion.div>
          ))}
        </motion.ul>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {/* User Profile / Login Button */}
          {token ? (
            <motion.div 
              className="flex items-center gap-3 cursor-pointer group relative"
              whileHover={{ scale: 1.05 }}
            >
              <img className="w-10 h-10 rounded-full ring-2 ring-blue-200" src={assets.profile_pic} alt="Profile"/>
              <motion.div 
                className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg hidden group-hover:block"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex flex-col gap-2 p-3">
                  <button 
                    onClick={() => navigate('my-profile')}
                    className="text-gray-700 hover:bg-blue-50 rounded px-4 py-2 text-left transition-all duration-300"
                  >
                    My Profile
                  </button>
                  <button 
                    onClick={() => navigate('my-appointment')}
                    className="text-gray-700 hover:bg-blue-50 rounded px-4 py-2 text-left transition-all duration-300"
                  >
                    My Appointments
                  </button>
                  <button 
                    onClick={() => setToken(false)}
                    className="text-gray-700 hover:bg-blue-50 rounded px-4 py-2 text-left transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <Button 
              text="Login" 
              onClick={() => navigate('/login')} 
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-2 rounded-full transform hover:scale-105 transition-all duration-300"
            />
          )}

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMenu(true)}
            className="md:hidden text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </motion.button>

          {/* Mobile Menu */}
          <motion.div 
            className={`${showMenu ? 'fixed' : 'hidden'} md:hidden inset-0 z-50 bg-white`}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: showMenu ? 1 : 0, x: showMenu ? 0 : "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-5 py-6 border-b border-gray-100">
              <img className="w-36" src={assets.logo} alt="Logo" />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMenu(false)}
                className="text-gray-700"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
            <motion.ul 
              className="flex flex-col items-center gap-6 px-5 py-8 text-lg font-medium"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {navItems.map((item, index) => (
                <motion.li
                  key={index}
                  variants={menuItemAnimation}
                  whileHover={{ scale: 1.05 }}
                  className="w-full"
                >
                  <NavLink 
                    to={item.path}
                    onClick={() => setShowMenu(false)}
                    className={({ isActive }) => 
                      `block text-center py-3 rounded-lg transition-all duration-300 ${
                        isActive 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;