import React from 'react'
import logo from "./logo.png"
import { Link } from 'react-router-dom';

interface Props {}

const navbar = (props: Props) => {
  return (
  <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
          <img src={logo} alt="" className="w-16" />
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link to="/" className="text-black hover:text-darkBlue">
              Dashboard 
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-6 text-back">
          <Link to="/login" className="hover:text-darkBlue">Login</Link>
          <Link
            to="/register"
            className="px-8 py-3 font-bold rounded text-white bg-darkBlue hover:opacity-90"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default navbar