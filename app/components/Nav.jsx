'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() =>{
    const handleScroll = () =>{
      if(window.scrollY > 0){
        setIsScrolled(true)
      } else {
        setIsScrolled (false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return()=>{

    }
  } , [])

  return (
    <div>
      {/* <nav className='bg-white w-full shadow-lg p-2'> */}
      <nav className={`bg-white shadow  p-3 transition-all duration-0.5s ease-in-out ${isScrolled ? 'fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-[50px]' : 'relative w-full'} xl:py-1`}>
        <div>
          <Image 
            src={'/icons8-menu-50.png'} 
            alt='Menu' 
            width={30} 
            height={30} 
            onClick={() => setIsOpen(!isOpen)}  


          />   

          <div className='flex gap-4 absolute right-1 -mt-8'>
            <div>
            <Image src={'/icons8-search-50.png'} alt='' width={26} height={26} className='mt-2'/>
            </div>
            <button className='p-2 w-[85px] rounded-full bg-[#646ae8] text-white'>Login</button>
          </div>
        </div> 

        {/* Mobile Menu - slide in/out from the left */}
        <div
          className={`
            fixed top-0 mt-3 left-0 h-[500px] rounded-tr-[10px] rounded-br-[10px] w-64 bg-[#646ae8] shadow-lg transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            z-50
          `}
        >
          <div className="px-6 pt-6 ">
            <button
              onClick={() => setIsOpen(false)}
              className="mb-6 inline-flex items-center px-3 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6 text-white  hover:bg-[#646ae8] hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"

              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>

            <a
              href="#"
              className="block font-bold text-[24px] text-white px-3 py-2 rounded-md text-base font-medium hover:bg-[#646ae8] hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              𝘾𝙖𝙧𝙍𝙚𝙣𝙩𝙞𝙛𝙮
            </a>
            <a
              href="#"
              className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-[#646ae8] hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a
              href="#"
              className="block text-white  px-3 py-2 rounded-md text-base font-medium hover:bg-[#646ae8] hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#"
              className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-[#646ae8] hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Services
            </a>
            <a
              href="#"
              className="block text-white  px-3 py-2 rounded-md text-base font-medium hover:bg-[#646ae8] hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav;
