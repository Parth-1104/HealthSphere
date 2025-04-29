import React, { useContext, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)
    const scrollContainer = useRef(null)

    // Function to handle smooth scrolling with arrow buttons
    const scroll = (direction) => {
        if (scrollContainer.current) {
            const containerWidth = scrollContainer.current.offsetWidth
            const scrollAmount = containerWidth / 2
            
            scrollContainer.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
            
            {/* Mobile view with horizontal scrolling */}
            <div className='relative w-full md:hidden'>
                <div 
                    ref={scrollContainer}
                    className='flex overflow-x-auto pb-5 pt-5 px-3 gap-4 scrollbar-hide snap-x snap-mandatory scroll-smooth'
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {doctors.slice(0, 10).map((item, index) => (
                        <div 
                            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                            className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer flex-shrink-0 w-[260px] snap-start transition-all duration-300 hover:shadow-md transform hover:scale-[1.02]' 
                            key={index}
                        >
                            <img className='bg-[#EAEFFF] w-full h-[160px] object-cover' src={item.image} alt={item.name} />
                            <div className='p-4'>
                                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                                    <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p>
                                    <p>{item.available ? 'Available' : "Not Available"}</p>
                                </div>
                                <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                                <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Scroll indicators */}
                <div className='flex justify-center gap-2 mt-4'>
                    <button 
                        onClick={() => scroll('left')} 
                        className='bg-[#EAEFFF] text-gray-600 w-10 h-10 rounded-full flex items-center justify-center shadow-sm hover:bg-[#DCE5FF] transition-colors'
                        aria-label="Scroll left"
                    >
                        ←
                    </button>
                    <button 
                        onClick={() => scroll('right')} 
                        className='bg-[#EAEFFF] text-gray-600 w-10 h-10 rounded-full flex items-center justify-center shadow-sm hover:bg-[#DCE5FF] transition-colors'
                        aria-label="Scroll right"
                    >
                        →
                    </button>
                </div>
            </div>
            
            {/* Desktop view with grid layout */}
            <div className='w-full hidden md:grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div 
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                        className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' 
                        key={index}
                    >
                        <img className='bg-[#EAEFFF] w-full h-auto object-cover' src={item.image} alt={item.name} />
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                                <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p>
                                <p>{item.available ? 'Available' : "Not Available"}</p>
                            </div>
                            <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                            <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <button 
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                className='bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-[#DCE5FF] transition-colors'
            >
                more
            </button>
        </div>
    )
}

export default TopDoctors