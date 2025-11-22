import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import { UserProvider } from './Context/UserAuth';


function App() {
  return( 
  <div className="h-screen flex flex-col">



    <UserProvider>
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      {/*'footer'*/}
    <div className="h-12 w-full  flex items-center justify-center" style={{backgroundColor: '#e5e7eb'}}>
    
      </div>
    </UserProvider>


    </div>);
}

export default App;
