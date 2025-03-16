import React from 'react'
import Button2 from './Button2';

const Video = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Video container */}
      {/* <video 
        className="w-full h-full object-cover rounded-[30px] md:rounded-[30px] lg:rounded-[50px]"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source 
          src="https://demo.awaikenthemes.com/assets/videos/dispnsary-video.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video> */}
      <img className='w-full h-full object-cover rounded-[30px] md:rounded-[30px] lg:rounded-[50px]' src="https://demo.awaikenthemes.com/dispnsary/wp-content/uploads/2024/12/hero-image-bg.jpg" alt="" srcset="" />

      {/* Blue overlay */}
      <div className="absolute inset-0 bg-black/55 rounded-[30px] md:rounded-[40px] lg:rounded-[50px]" />


      {/* Responsive Text Overlay */}
    

      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className='flex gap-3  items-center justify-center'>
    <img className='mb-3' src="https://demo.awaikenthemes.com/dispnsary/wp-content/themes/dispnsary/assets/images/icon-sub-heading.svg" alt="" srcset="" />
  <h1 className="text-white text-2xl sm:text-4xl md:text-2xl mb-5 lg:text-2xl font-bold tracking-wider">
  From travel to treatment we handle it all-
  </h1>
  </div>
  <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider">
    Booking Meditrip Got Easier
  </h1>

  {/* Container for h3 elements with left alignment */}
  <div className="flex flex-col items-center  mt-[-15px] text-white text-2xl sm:text-4xl md:text-2xl lg:text-2xl font-bold tracking-wider">
    <h3 className="self-start"><br></br>Crypto payments and Personal Assistant throughout the trip</h3>

  </div>

  <div className='flex gap-5 py-3 mt-4'>
    <Button2 text="Book Appointment"/>
  <Button2 text="About Us"/>
  </div>

</div>

      
    </div>
  );
};

export default Video;
