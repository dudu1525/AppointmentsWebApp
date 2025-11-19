import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/navbar';
import { Outlet } from 'react-router';


function App() {
  return( 
  <div className="h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      {/*'footer'*/}
 <div className="h-12 w-full  flex items-center justify-center" style={{backgroundColor: '#e5e7eb'}}>
    
      </div>

    </div>);
}

export default App;
