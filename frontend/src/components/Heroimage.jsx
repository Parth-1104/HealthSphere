import React from 'react';

const Heroimage = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Main hero image - centered */}
      <img
        src="https://demo.awaikenthemes.com/dispnsary/wp-content/uploads/2025/01/hero-img.png"
        alt="Hero"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-auto object-contain"
      />
      
      {/* Background shape 2 - offset to bottom right */}
      <img
        src="https://demo.awaikenthemes.com/dispnsary/wp-content/uploads/2025/01/hero-bg-shape-2.png"
        alt="Background shape 2"
        className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-2/3 h-auto object-contain"
      />
      
      {/* Background shape 1 - offset to top left */}
      <img
        src="https://demo.awaikenthemes.com/dispnsary/wp-content/uploads/2025/01/hero-img-bg-shape.png"
        alt="Background shape 1"
        className="absolute left-0 top-0 -translate-x-1/4 -translate-y-1/4 w-2/3 h-auto object-contain"
      />
    </div>
  );
};

export default Heroimage;