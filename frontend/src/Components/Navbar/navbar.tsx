import React from 'react'
import logo from "./logo.png"
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/UserAuth';
interface Props {}//should receive user id and patient id or smth to pass to dashboards

const Navbar = (props: Props) => {

  const {isLoggedIn, user ,logout} = useAuth();

  const handleUserTypeLoad = () =>
  {     //switch on user and go to dashboard
        //to=`/ ${user?.role}/${user?.userId}`  
  };
  
  return (
 <nav className="bg-navbarColor">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-20">
            <Link to="/">
              <img src={logo} alt="" className="w-16" />
            </Link>
            <div className="hidden font-bold lg:flex">
              <Link to="/patient/1" className="text-black hover:text-darkBlue">
                Dashboard 
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-6 text-back">

           <div>   
           {isLoggedIn() ? (<>
              <span className="mr-4">Welcome, {user?.userName}!</span>
        <button  className="hover:text-darkBlue" onClick={logout}>
          Logout
        </button>
      </>
    ) : (
      <Link to="/login" className="hover:text-darkBlue">
        Login
      </Link>
    )}
  </div>

          <div>
            {isLoggedIn() ? (<></>) :(
            <Link
              to="/register"
              className="px-8 py-3 font-bold rounded text-white bg-darkBlue hover:opacity-90"
            >
              Signup
            </Link>)}
        </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar