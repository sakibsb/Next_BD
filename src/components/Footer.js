import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-200 mt-10">
      <div className="container mx-auto py-6">
        {/* Customer Care Section */}
        <div className="text-center mb-6">
          <p className="text-gray-700 font-semibold text-lg">
            Customer Care:
            <span className="underline cursor-pointer"> Contact us via Live Chat</span> or send us an email:
            <a href="mailto:care@next_bd.com" className="text-blue-600 hover:text-blue-800"> care@next_bd.com</a>
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="text-gray-800 font-semibold mb-2">About Us</h3>
            <ul>
              <li><a href="/about" className="text-gray-600 hover:text-blue-600">Our Story</a></li>
              <li><a href="/careers" className="text-gray-600 hover:text-blue-600">Careers</a></li>
              <li><a href="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-600 hover:text-blue-600">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-800 font-semibold mb-2">Customer Support</h3>
            <ul>
              <li><a href="/faq" className="text-gray-600 hover:text-blue-600">FAQ</a></li>
              <li><a href="/shipping" className="text-gray-600 hover:text-blue-600">Shipping Information</a></li>
              <li><a href="/returns" className="text-gray-600 hover:text-blue-600">Returns & Exchanges</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-blue-600">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-800 font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-600 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="text-gray-600 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="text-gray-600 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className="text-gray-600 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription Section */}
        <div className="text-center mb-6">
          <h3 className="text-gray-800 font-semibold mb-2">Subscribe to Our Newsletter</h3>
          <p className="text-gray-600 mb-4">Get the latest updates and offers</p>
          <div className="flex justify-center">
            <input type="email" placeholder="Enter your email" className="px-4 py-2 border border-gray-400 rounded-l-full" />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition duration-300">Subscribe</button>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="text-center text-gray-600 mt-4">
          <p>&copy; {new Date().getFullYear()} Next BD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;