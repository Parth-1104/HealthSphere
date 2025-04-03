import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <div className="flex flex-col items-center gap-4 my-16 text-gray-800 md:mx-10">
            <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
            <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive range of trusted doctors.</p>
            
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-5 px-3 sm:px-0">
                {doctors.slice(0, 10).map((item) => (
                    <div 
                        key={item._id} 
                        onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
                        className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                    >
                        <img className="bg-blue-50 w-full h-40 object-cover" src={item.image} alt={item.name} />
                        <div className="p-4">
                            <div className="flex items-center gap-2 text-sm text-green-500">
                                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                                <p>Available</p>
                            </div>
                            <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                            <p className="text-gray-600 text-sm">{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <button 
                onClick={() => { navigate('/doctors'); window.scrollTo(0, 0); }} 
                className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
            >
                More
            </button>
        </div>
    );
};

export default TopDoctors;
