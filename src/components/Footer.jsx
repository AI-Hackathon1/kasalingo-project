import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#5e1b55] text-white px-6 py-10 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand Info */}
        <div>
          <h3 className="text-2xl font-bold mb-2 text-pink-400">Kasalingo GH</h3>
          <p className="text-sm text-pink-100">
            Reconnecting the next generation with Ghanaian heritage through fun and engaging language learning.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-[#FBCFE8]">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-pink-400 transition">About</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Languages</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Levels</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Team</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-[#FBCFE8]">Contact Us</h4>
          <p className="text-sm text-pink-100">Email: hello@kasalingo.com</p>
          <p className="text-sm text-pink-100">Phone: +233 123 456 789</p>
        </div>
      </div>

      <div className="mt-8 border-t border-pink-400 pt-4 text-center text-sm text-[#FBCFE8]">
        © {new Date().getFullYear()} Kasalingo GH. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
