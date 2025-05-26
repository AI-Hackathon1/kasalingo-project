import React from 'react';
import Lovely from '../assets/images/Lovely.jpg';

const Navbar = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* Navbar with background image */}
      <div
        className="flex justify-end items-center gap-4 min-h-[100px] p-4 sm:p-6 md:p-8 bg-cover "
        style={{ backgroundImage: `url(${Lovely})` }}
      >
        <span className="px-6 py-2 bg-yellow-500 rounded-full text-sm sm:text-lg md:text-xl text-white font-semibold">
          Log In
        </span>
        <span className="px-6 py-2 bg-pink-500 rounded-full text-sm sm:text-lg md:text-xl text-white font-semibold">
          Sign Up
        </span>
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
            fill="#fef08a"
          />
        </svg>
      </div>
    </div>
  );
};

export default Navbar;
