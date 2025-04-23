import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="px-4 md:px-20 mt-[95px] bg-gradient-to-b from-[#f5faff] to-white text-gray-700">

      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-[#2c3e50]">Welcome to <span className="text-blue-600">HealthSphere</span></h2>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          Your global partner for seamless medical travel experiences in India.
        </p>
      </div>

      {/* About Content */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
        <img className="w-full md:max-w-[400px] rounded-lg shadow-lg" src={assets.about_image} alt="HealthSphere Medical Travel" />
        <div className="md:w-3/5 flex flex-col gap-6 text-[15px] text-gray-600 leading-relaxed">
          <p><strong>HealthSphere</strong> bridges the gap between international patients and world-class Indian healthcare. We provide remote consultations, travel planning, custom cabs, crypto payments, and personal medical assistants — all in one unified platform.</p>
          <p>From your home country to your hospital bed in India and back — we ensure a smooth, safe, and satisfying journey. Our team speaks your language, understands your cultural needs, and supports you 24/7 throughout your trip.</p>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Our Mission</h3>
            <p>We aim to make medical travel stress-free, transparent, and empowering for patients from around the world. We’re more than a service — we’re your support system abroad.</p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-20">
        <h3 className="text-2xl font-bold text-center mb-10 text-[#2c3e50]">Why Choose <span className="text-blue-600">Us</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="border rounded-2xl px-8 py-10 shadow-sm bg-white hover:bg-blue-50 transition-all duration-300">
            <h4 className="font-semibold text-lg mb-3 text-blue-700">Remote Video Consultations</h4>
            <p>Connect with India’s top doctors before your flight. Plan your treatment with confidence from the comfort of your home.</p>
          </div>

          <div className="border rounded-2xl px-8 py-10 shadow-sm bg-white hover:bg-blue-50 transition-all duration-300">
            <h4 className="font-semibold text-lg mb-3 text-blue-700">Cryptocurrency Payments</h4>
            <p>Pay securely with Bitcoin, Ethereum, USDT, and more. Simplified, borderless healthcare financing for modern travelers.</p>
          </div>

          <div className="border rounded-2xl px-8 py-10 shadow-sm bg-white hover:bg-blue-50 transition-all duration-300">
            <h4 className="font-semibold text-lg mb-3 text-blue-700">Custom Cab & Personal Assistant</h4>
            <p>Door-to-door pickup, translation help, hospital coordination — your assistant handles it all so you can heal stress-free.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
