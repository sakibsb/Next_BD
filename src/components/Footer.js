import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-100 mt-10">
      <div className="container mx-auto py-10">
        {/* Customer Care Section */}
        <div className="text-center mb-8">
          <p className="text-gray-300 text-lg">
            <strong>Customer Care:</strong>
            <span className="underline cursor-pointer hover:text-white transition duration-300"> Contact us via Live Chat</span> or email us at:
            <a href="mailto:care@next_bd.com" className="text-blue-400 hover:text-blue-500 ml-1 transition duration-300">care@next_bd.com</a>
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">About Us</h3>
            <ul>
              <li><a href="/about" className="text-gray-300 hover:text-white transition duration-300">Our Story</a></li>
              <li><a href="/careers" className="text-gray-300 hover:text-white transition duration-300">Careers</a></li>
              <li><a href="/privacy" className="text-gray-300 hover:text-white transition duration-300">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-white transition duration-300">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Customer Support</h3>
            <ul>
              <li><a href="/faq" className="text-gray-300 hover:text-white transition duration-300">FAQ</a></li>
              <li><a href="/shipping" className="text-gray-300 hover:text-white transition duration-300">Shipping Information</a></li>
              <li><a href="/returns" className="text-gray-300 hover:text-white transition duration-300">Returns & Exchanges</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition duration-300">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="https://facebook.com" className="text-gray-300 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                <FaFacebookF size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-gray-700 pt-6 mt-6">
          <p className="text-center text-gray-400 text-sm">&copy; {new Date().getFullYear()} Next BD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;