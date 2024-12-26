import React from 'react'
import Navbar from  '../components/Navbar';
import Footer from  '../components/Footer';

function ContactUs() {
  return (
    <>
    <Navbar currentPage="Home" />
        <h1 className='text-center mt-12  mb-6  text-2xl font-semibold'>Get In  Touch With  Us</h1>
    <div className="contactus mb-8">
        <div className="twoSectionLayout flex items-center  px-16 gap-4 justify-center">
            <div className="leftSection w-1/2 rounded-md shadow-md p-3  border">Left</div>
            <div className="righSection w-1/2 rounded-md shadow-md p-3 border">Right</div>
        </div>
    </div>
    <Footer />
    </>
  )
}

export default ContactUs