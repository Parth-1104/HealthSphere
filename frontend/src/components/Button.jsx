import React from 'react';

const Button = ({ text = "Explore", onClick }) => {
  return (
    <button 
      type="button"  // Change to button to prevent unintended form submission
      onClick={onClick}  // Attach the onClick event here
      className="relative flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md 
      lg:font-semibold isolation-auto border-gray-50 overflow-hidden border-2 rounded-full group px-6 py-3 
      before:absolute before:w-full before:h-full before:bg-emerald-500 before:rounded-full 
      before:scale-0 before:transition-transform before:duration-500 before:ease-in-out 
      hover:before:scale-150 hover:text-white"
    >
      <span className="relative z-10">{text}</span>
      <svg 
        className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-900 ease-linear 
        duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45" 
        viewBox="0 0 16 19" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" 
          className="fill-gray-800 group-hover:fill-gray-800" 
        />
      </svg>
    </button>
  );
}

export default Button;
