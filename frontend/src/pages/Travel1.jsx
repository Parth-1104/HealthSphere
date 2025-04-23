import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Stethoscope, MapPin, ShieldCheck, Wallet } from 'lucide-react';

function HomeMediTrip() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-tr from-indigo-700 to-purple-800 min-h-screen mt-[80px] px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center text-white mb-12">
          <div className="bg-white p-4 rounded-full shadow-xl inline-block mb-6">
            <Stethoscope className="h-10 w-10 text-indigo-700" />
          </div>
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Your Health Journey in India Starts Here
          </h1>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
            Personalized medical travel guidance and cab assistance for international patients visiting India. We ensure you're never lost or alone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <button
              onClick={() => navigate('/book-trip')}
              className="bg-white text-indigo-800 px-8 py-3 rounded-full hover:bg-indigo-100 transition font-semibold flex items-center gap-2 shadow-lg"
            >
              <Heart className="h-5 w-5" />
              <span>Medical Travel Guidance</span>
            </button>
            <button
              onClick={() => window.location.href = 'https://navigoo.vercel.app/'}
              className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-indigo-800 transition font-semibold"
            >
              Get a Cab in India
            </button>
          </div>
        </div>

        {/* Feature Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-5xl">
          <h2 className="text-3xl font-bold mb-10 text-indigo-800 text-center">
            Why Foreigners Trust MediTrip in India
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-indigo-600 mr-2" />
                <h3 className="text-xl font-semibold text-indigo-700">Reliable Cab Services</h3>
              </div>
              <p className="text-gray-600">
                Book verified drivers and safe transport directly from the airport to your hospital or hotel – no language barriers, no scams.
              </p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Wallet className="h-6 w-6 text-indigo-600 mr-2" />
                <h3 className="text-xl font-semibold text-indigo-700">All-in-One Medical Travel Help</h3>
              </div>
              <p className="text-gray-600">
                From treatment selection to accommodation and follow-ups – we take care of your complete journey in India.
              </p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <ShieldCheck className="h-6 w-6 text-indigo-600 mr-2" />
                <h3 className="text-xl font-semibold text-indigo-700">Local Support, Global Standards</h3>
              </div>
              <p className="text-gray-600">
                Get 24/7 multilingual assistance from professionals who understand the Indian healthcare ecosystem and your needs.
              </p>
            </div>
          </div>
        </div>

        {/* Image & Call to Action */}
        <div className="mt-16 text-center">
          <div className="overflow-hidden rounded-xl shadow-2xl">
            <img
              src="/api/placeholder/1200/600"
              alt="Foreign patient in India"
              className="w-full object-cover h-80"
            />
          </div>
          <h3 className="text-2xl font-semibold text-white mt-6 mb-2">
            Thousands of foreign patients trust us for care and comfort in India
          </h3>
          <p className="text-indigo-200">
            MediTrip is your guide, translator, travel planner, and care companion – all in one.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeMediTrip;
