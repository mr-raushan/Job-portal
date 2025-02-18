import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6">
          {/* Logo or Brand Name */}
          <h2 className="text-2xl font-bold">
            Job<span className="text-red-600 italic">Portal</span>
          </h2>

          {/* Navigation Links */}
          <ul className="flex space-x-6 mt-4 md:mt-0">
            <li>
              <Link to="/" className="hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-400">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-blue-400">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-400">
                Contact
              </Link>
            </li>
          </ul>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              to="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-500"
            >
              <FaFacebookF />
            </Link>
            <Link
              to="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-400"
            >
              <FaTwitter />
            </Link>
            <Link
              to="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-pink-500"
            >
              <FaInstagram />
            </Link>
            <Link
              to="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-600"
            >
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-6 text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Job
            <span className="text-red-600 italic">Portal</span>. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
