import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#5e1b55] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Kasalingo GH</h3>
            <p className="text-[#FBCFE8]">
              Making Ghanaian language learning fun and accessible for children worldwide.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-[#FBCFE8] hover:text-white">About Us</a></li>
              <li><a href="/contact" className="text-[#FBCFE8] hover:text-white">Contact</a></li>
              <li><a href="/register" className="text-[#FBCFE8] hover:text-white">Get Started</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <p className="text-[#FBCFE8]">
              Follow us on social media for updates and learning tips.
            </p>
          </div>
        </div>
        <div className="border-t border-[#FBCFE8]/20 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Kasalingo GH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
