import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/UserAuth';

const Unauthorized = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Current role: <span className="font-semibold">{user?.role}</span>
        </p>
        <div className="space-x-4">
       {/*    <Link 
            to={`/${user?.role?.toLowerCase()}`} 
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
          <button 
            onClick={logout}
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            Logout
          </button>
    
        */}
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;