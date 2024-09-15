import React, { useState } from 'react';
import Navbar from './global/assets/components/navbar/Navbar';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
