import React from 'react';
import Sidebar from '../components/home/Sidebar';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className='flex flex-col md:flex-row h-[98vh] gap-4 p-4'>
      <div className='md:w-1/4 lg:w-1/6 border border-gray-500 rounded-xl p-4'>
        <Sidebar />
      </div>
      <div className='md:w-3/4 lg:w-5/6 border border-gray-500 rounded-xl p-4 flex-1'>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;

