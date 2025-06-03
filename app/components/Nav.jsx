'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { auth } from '@/firebaseConfig'; // Import your Firebase auth
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      <nav className={`bg-white shadow p-4 transition-all duration-300 ease-in-out ${
        isScrolled ? 'fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-[50px]' : 'relative w-full'
      } xl:py-1`}>
        <div className="flex justify-between items-center">
          {/* Menu button */}
          <Image 
            src={'/icons8-menu-50.png'} 
            alt='Menu' 
            width={30} 
            height={30} 
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer"
          />   

          {/* Right side - profile/login */}
          <div className='flex gap-4 items-center'>
            <Image 
              src={'/icons8-search-50.png'} 
              alt='Search' 
              width={26} 
              height={26} 
              className='cursor-pointer'
            />
            
            {user ? (
              <div className="relative group">
                <div className="flex items-center cursor-pointer">
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="Profile"
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#646ae8] flex items-center justify-center text-white font-semibold">
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
                
                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-semibold">{user.displayName || 'User'}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link 
                    href="/Profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    href="/bookings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                href="/Login" 
                className="p-2 rounded-full bg-[#646ae8] text-white font-semibold text-[14px] hover:bg-[#4a50c5] transition-colors"
              >
                Login/Signup
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          fixed top-0 mt-3 left-0 h-[500px] rounded-tr-[10px] rounded-br-[10px] w-64 bg-[#646ae8] shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          z-50
        `}>
          <div className="px-6 pt-6">
            <button
              onClick={() => setIsOpen(false)}
              className="mb-6 inline-flex items-center px-3 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6 text-white hover:bg-[#646ae8] hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>
            
            {user && (
              <div className="flex items-center mb-4 ">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                ) : (
                  <div className="p-3 rounded-full  bg-white  items-center justify-center text-[#646ae8] font-bold mr-3">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                <div>
                  <p className="text-white font-medium">{user.displayName || 'User'}</p>
                  <p className="text-white text-sm">{user.email}</p>
                </div>
              </div>
            )}
            
            <Link
              href={"/Home"}
              className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-[#4a50c5]"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            
            <Link
              href={'/Cars-page'}
              className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-[#4a50c5]"
              onClick={() => setIsOpen(false)}
            >
              Cars
            </Link>
            
            <Link
              href="/bookings"
              className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-[#4a50c5]"
              onClick={() => setIsOpen(false)}
            >
              Bookings
            </Link>
            
            {user && (
              <Link href={'/Login'} >
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#4a50c5]"
              >
                Sign out
              </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav;