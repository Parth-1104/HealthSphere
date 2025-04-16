import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

function HomeTravel() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Your Next Adventure
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Get personalized travel recommendations and guides for your dream destination
        </p>
        <button
          onClick={() => navigate('/book-trip')}
          className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 mx-auto"
        >
          <MapPin className="h-5 w-5" />
          <span>Plan Your Journey</span>
        </button>
      </div>
      <img
        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
        alt="Travel"
        className="mt-12 rounded-lg shadow-xl max-w-4xl w-full"
      />
    </div>
  );
}

export default HomeTravel;