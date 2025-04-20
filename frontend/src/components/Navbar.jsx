import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { token, setToken, userData } = useContext(AppContext);
    const [scrolled, setScrolled] = useState(false);

    // Track scroll position for navbar effects
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setToken(false);
        navigate('/login');
    };

    // Clean underline effect for desktop nav links
    const getNavLinkClass = ({ isActive }) =>
        `relative py-2 px-4 font-medium transition-all duration-300 overflow-hidden ${
            isActive
                ? 'text-teal-600 font-semibold' 
                : 'text-gray-700 hover:text-teal-600'
        } before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-teal-600 before:origin-right before:scale-x-0 before:transition-transform before:duration-300 ${
            isActive ? 'before:scale-x-100' : 'hover:before:origin-left hover:before:scale-x-100'
        }`;

    // Mobile nav link styling
    const getMobileNavLinkClass = ({ isActive }) =>
        `block w-full text-left px-6 py-4 transition-colors duration-200 rounded-lg ${
            isActive
                ? 'bg-teal-50 text-teal-700 font-semibold' 
                : 'text-gray-700 hover:bg-gray-50'
        }`;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled 
                ? 'py-2 bg-white shadow-md' 
                : 'py-4 bg-white'
        }`}>
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <div
                    onClick={() => navigate('/')}
                    className="flex items-center gap-3 cursor-pointer group"
                >
                    <div className="w-12 h-12 rounded-full bg-teal-50 p-1 shadow-sm transform transition-transform group-hover:scale-105">
                        <img 
                            className="w-full h-full object-contain" 
                            src={assets.newlogo} 
                            alt="HealthSphere" 
                        />
                    </div>
                    <span className="text-2xl font-bold text-teal-700">
                        HealthSphere
                    </span>
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex items-center gap-x-8 font-medium">
                    <li><NavLink to="/" className={getNavLinkClass}>HOME</NavLink></li>
                    <li><NavLink to="/doctors" className={getNavLinkClass}>DOCTORS</NavLink></li>
                    <li><NavLink to="/about" className={getNavLinkClass}>ABOUT</NavLink></li>
                    <li><NavLink to="/contact" className={getNavLinkClass}>CONTACT</NavLink></li>
                    <li><NavLink to="/travel" className={getNavLinkClass}>TRAVEL</NavLink></li>
                </ul>

                {/* Auth Buttons / User Menu */}
                <div className="flex items-center gap-x-4">
                    {token && userData ? (
                        // User Logged In - Profile Dropdown
                        <div className="relative group">
                            <button className="flex items-center gap-3 cursor-pointer bg-gray-50 rounded-full py-1 px-3 hover:bg-gray-100 transition-colors border border-gray-200">
                                <div className="relative">
                                    <img
                                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm transition-transform group-hover:scale-105" 
                                        src={userData.image || assets.profile_icon} 
                                        alt="User"
                                    />
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
                                </div>
                                <span className="text-gray-700 font-medium hidden md:block">
                                    {userData.name?.split(' ')[0] || 'User'}
                                </span>
                                <img 
                                    className="w-3 transition-transform duration-300 group-hover:rotate-180" 
                                    src={assets.dropdown_icon} 
                                    alt="" 
                                />
                            </button>
                            {/* Dropdown Menu with improved styling */}
                            <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 overflow-hidden transition-all duration-200 transform origin-top-right scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible border border-gray-200">
                                <div className="bg-teal-50 px-4 py-3">
                                    <p className="font-bold text-gray-800">{userData.name || 'User'}</p>
                                    <p className="text-xs text-gray-500">{userData.email || ''}</p>
                                </div>
                                <div className="p-1">
                                    <button
                                        onClick={() => navigate('/my-profile')}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg flex items-center gap-2 transition-colors"
                                    >
                                        <span className="w-5 h-5 text-teal-600">👤</span>
                                        My Profile
                                    </button>
                                    <button
                                        onClick={() => navigate('/my-appointments')}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg flex items-center gap-2 transition-colors"
                                    >
                                        <span className="w-5 h-5 text-teal-600">📅</span>
                                        My Appointments
                                    </button>
                                    <hr className="my-1 border-gray-200" />
                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 rounded-lg flex items-center gap-2 transition-colors"
                                    >
                                        <span className="w-5 h-5">🚪</span>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // User Logged Out - Professional button
                        <button
                            onClick={() => navigate('/login')}
                            className="hidden md:flex items-center gap-2 bg-teal-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-teal-700 transition-all duration-300 shadow-sm"
                        >
                            <span>Login / Sign Up</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    {/* Mobile Menu Hamburger Icon */}
                    <button
                        onClick={() => setShowMenu(true)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-colors lg:hidden"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Panel with overlay */}
            <div className={`fixed inset-0 z-50 ${showMenu ? 'block' : 'hidden'}`}>
                {/* Dark overlay */}
                <div 
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    onClick={() => setShowMenu(false)}
                ></div>
                
                {/* Slide-in menu panel */}
                <div className={`absolute top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
                    showMenu ? 'translate-x-0' : 'translate-x-full'
                }`}>
                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                                <img className="w-7 h-7" src={assets.newlogo} alt="Logo" />
                            </div>
                            <span className="text-lg font-bold text-teal-700">
                                HealthSphere
                            </span>
                        </div>
                        <button
                            onClick={() => setShowMenu(false)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Mobile menu content */}
                    <div className="p-5">
                        <ul className="space-y-2">
                            <li><NavLink onClick={() => setShowMenu(false)} to="/" className={getMobileNavLinkClass}>HOME</NavLink></li>
                            <li><NavLink onClick={() => setShowMenu(false)} to="/doctors" className={getMobileNavLinkClass}>ALL DOCTORS</NavLink></li>
                            <li><NavLink onClick={() => setShowMenu(false)} to="/about" className={getMobileNavLinkClass}>ABOUT</NavLink></li>
                            <li><NavLink onClick={() => setShowMenu(false)} to="/contact" className={getMobileNavLinkClass}>CONTACT</NavLink></li>
                            <li><NavLink onClick={() => setShowMenu(false)} to="/travel" className={getMobileNavLinkClass}>TRAVEL</NavLink></li>
                        </ul>
                        
                        {/* Mobile login/signup button */}
                        {!token && (
                            <div className="mt-8">
                                <button
                                    onClick={() => { navigate('/login'); setShowMenu(false); }}
                                    className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 flex items-center justify-center gap-2"
                                >
                                    <span>Login / Sign Up</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        )}
                        
                        {/* User profile section for mobile if logged in */}
                        {token && userData && (
                            <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" 
                                        src={userData.image || assets.profile_icon} 
                                        alt="User"
                                    />
                                    <div>
                                        <p className="font-bold text-gray-800">{userData.name || 'User'}</p>
                                        <p className="text-sm text-gray-500">{userData.email || ''}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => { navigate('/my-profile'); setShowMenu(false); }}
                                        className="w-full bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-200 flex items-center gap-2"
                                    >
                                        <span>My Profile</span>
                                    </button>
                                    <button
                                        onClick={() => { navigate('/my-appointments'); setShowMenu(false); }}
                                        className="w-full bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-200 flex items-center gap-2"
                                    >
                                        <span>My Appointments</span>
                                    </button>
                                    <button
                                        onClick={() => { logout(); setShowMenu(false); }}
                                        className="w-full bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-100 flex items-center gap-2"
                                    >
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;