import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/navbar';
import { Outlet } from 'react-router';


function App() {
  return( <>
    <Navbar />
    <Outlet />
  
  
  </>);
}

export default App;
