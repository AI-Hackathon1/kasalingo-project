import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* Navbar with background image */}
      <div
        className="flex justify-end items-center gap-4 min-h-[100px] p-4 sm:p-6 md:p-8 bg-[#210F37] ">
        <Link 
          to="/Login" 
          className="px-6 py-2 bg-[#FBCFE8] rounded-full text-sm sm:text-lg md:text-xl text-pink-500 font-semibold hover:bg-yellow-600 transition-colors"
        >
          Log In
        </Link>
        <Link 
          to="/Register" 
          className="px-6 py-2  rounded-full text-sm sm:text-lg md:text-xl text-pink-500 font-semibold hover:bg-pink-600 transition-colors"
        >
          Sign Up
        </Link>
      </div>

      {/* SVG Wave BELOW the navbar, not inside */}
      <div className="w-full leading-none">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-[50px] sm:h-[60px] md:h-[80px]"
        >
          <path
            d="M0.00,49.98 C150.00,150.00 349.71,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            fill="#FBCFE8"
          />
        </svg>
      </div>
    </div>
  );
};

export default Navbar;
