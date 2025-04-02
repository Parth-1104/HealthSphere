import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
    return (
        <div className="md:mx-10"> 
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm"> 
                {/* left Section */}
                <div> 
                    <img className="mb-5 w-40"src={assets.logo} alt="" /> 
                    <p className="w-full md:w-2/3 text-gray-600 leading-6 "> Lorem Ipsium is simply the dummy text of printing and typewriting industry. Lorem Ipsium has been the industry's Standard Text </p>
                </div>

                {/* Center Section */}
                <div> 
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-2 text-gray-600"> 
                        <li>Home </li>
                        <li>About us </li>
                        <li>Contact us</li>
                        <li>Privacy Policy </li>
                    </ul>
                </div>

                {/* Right Section */}
                <div> 
                    <p className="text-xl font-medium mb-5"> GET IN TOUCH </p>
                    <ul className="flex flex-col gap-2 text-gray-600"> 
                        <li>+91xxxxxxxxx</li>
                        <li>email@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* --------------- Copyright text ------------------ */}
            <div> 
                <hr /> 
                <p className="py-5 text-sm text-center"> Copyrtight 2025 @ ____ - All Righs Reserved.</p>
            </div>
        </div>
    )
}