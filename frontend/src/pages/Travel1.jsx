import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Stethoscope } from 'lucide-react';

function HomeMediTrip() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 bg-blue-50">
      <div className="text-center max-w-2xl px-4">
        <div className="flex justify-center mb-6">
          <Stethoscope className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Healthcare Without Borders
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Find world-class medical treatments abroad with personalized care plans and trusted healthcare providers
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={() => navigate('/book-trip')}
            className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <Heart className="h-5 w-5" />
            <span>Travel Assistance</span>
          </button>
          <button
            onClick={() => navigate('/book-consultation')}
            className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors w-full sm:w-auto"
          >
            Book Cab
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Why Choose MediTrip?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-3">
              <h3 className="font-medium text-blue-700">Cost Savings</h3>
              <p className="text-sm text-gray-600">Save up to 70% on treatments compared to domestic prices</p>
            </div>
            <div className="p-3">
              <h3 className="font-medium text-blue-700">Accredited Hospitals</h3>
              <p className="text-sm text-gray-600">All our partners are internationally certified facilities</p>
            </div>
            <div className="p-3">
              <h3 className="font-medium text-blue-700">Full Support</h3>
              <p className="text-sm text-gray-600">From travel logistics to recovery care, we handle everything</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 w-full max-w-4xl px-4">
        <img
          src="/api/placeholder/1200/600"
          alt="Medical Travel"
          className="rounded-lg shadow-xl w-full object-cover"
        />
        <div className="mt-4 text-center text-gray-500 text-sm">
          Join thousands of patients who found quality healthcare abroad with MediTrip
        </div>
      </div>
    </div>
  );
}

export default HomeMediTrip;