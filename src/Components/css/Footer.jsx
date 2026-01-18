// Footer.jsx
import React from "react";
//import logo from "../assets/logo.png"; // replace with your logo path

const Footer = ({ user }) => {
  const backendUrl = "https://yessghor-server.vercel.app/";
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Section 1: Logo */}
        <div className="flex flex-col items-start">
          <img   className="w-32 mb-4" />
          <p className="text-gray-400 text-sm">
            Building the best web experiences for you.
          </p>
        </div>
        
        {/* Section 2: Quick Access */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Access</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Services</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
          </ul>
        </div>
        
        {/* Section 3: Resources */}
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="#" className="hover:text-white">Support</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>
        
        {/* Section 4: Contact Us */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400">
            Block A, Road 3, House 127(green view)<br />
            Mirpur 12, Dhaka-1216
          </p>
          <p className="text-gray-400 mt-2">Email: info@example.com</p>
          <p className="text-gray-400 mt-1">Phone: +123 456 7890</p>
        </div>
        
      </div>

      <div className="text-center text-gray-500 text-sm mt-10">
        &copy; 2026 Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
