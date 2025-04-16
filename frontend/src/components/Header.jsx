import React from 'react';
import { Bitcoin, Car, Phone, Video, UserRound, Plane, Building2, Stethoscope } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b  from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center gap-8 relative">
          {/* Left Section */}
          <div className="md:w-1/2 relative z-10">
            <div className="absolute -left-4 -top-4 animate-bounce-slow">
              <div className="bg-blue-500 p-3 rounded-2xl shadow-lg">
                <Plane className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="absolute right-0 top-20 animate-float">
              <div className="bg-green-500 p-3 rounded-2xl shadow-lg">
                <Bitcoin className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl pt-9 font-bold text-gray-800 mb-6">
              Your Medical Journey Made Simple
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Experience world-class healthcare with personalized assistance throughout your medical trip
            </p>
            
            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <FeatureCard
                icon={<Car className="w-5 h-5" />}
                title="Custom Cab"
                description="Dedicated transport service"
              />
              <FeatureCard
                icon={<Bitcoin className="w-5 h-5" />}
                title="Crypto Payments"
                description="Secure & convenient"
              />
              <FeatureCard
                icon={<Video className="w-5 h-5" />}
                title="Video Consult"
                description="Remote appointments"
              />
              <FeatureCard
                icon={<UserRound className="w-5 h-5" />}
                title="Personal Assistant"
                description="24/7 dedicated support"
              />
            </div>
            <a href="#speciality">
            <button  className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300">
              Start Your Journey
            </button>
            </a>
          </div>
          
          {/* Right Section */}
          <div className="md:w-1/2 relative">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80"
                alt="Medical Facility"
                className="rounded-2xl shadow-2xl"
              />
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-lg animate-float">
                <div className="flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-semibold">500+</p>
                    <p className="text-sm text-gray-600">Partner Hospitals</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-lg animate-float-delay">
                <div className="flex items-center gap-3">
                  <Stethoscope className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-semibold">1000+</p>
                    <p className="text-sm text-gray-600">Expert Doctors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="text-blue-600 mb-2">{icon}</div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

export default App;