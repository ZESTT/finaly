import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'; 

export default function Layout() {
  return (
    <>
      <Navbar/>
        <Toaster 
                position="top-center" 
                reverseOrder={false}
            /> 
      <div className='container mx-auto my-4 py-10'>

      </div>
      <Outlet></Outlet>  
    </>
  )
}
