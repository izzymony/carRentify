'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/firebaseConfig';

const page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: name
      });

      setSuccessMessage('Signup successful!');
      router.push('/Home'); // Redirect to home page or dashboard
    } catch (error) {
      console.error('Signup error:', error);
      let errorMessage = 'Failed to sign up';
      
      // More specific error messages
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email is already in use.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email is invalid.';
      }
      
      setError(errorMessage);
    }
  };

  return (
    <div className='h-screen'>
      <header>
        <div className='font-bold mt-10 text-[22px] text-black text-center'>SignUp</div> 
        <hr className='mt-4 flex flex-col-1' />          
      </header>
      <div className='px-4'>
        <section className='mt-8 py-4'>
          <h1 className='text-black text-center font-bold text-[30px] mt-8'>Create Your Account</h1>  
          <p className='text-[#aaaba9] font-semibold text-center'>Join CarRentify Rentals and find your perfect ride!</p>        
        </section>
        
        <form className="max-w-md mx-auto" onSubmit={handleSignUp}>
        <label htmlFor="name" className="block text-gray-500 text-lg mb-2 font-sans font-semibold">Name</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-lg">
              <Image src={'/icons8-customer-24.png'} width={20} height={20} alt="Name icon" />
            </span>
            <input
              id="name"
              name="name"
              type="text"
              value={name} 
              onChange={(e) => setName(e.target.value)}                   
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 text-gray-400 text-lg font-sans placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#646ae8] focus:border-[#646ae8]"
              required
            />
          </div>

          <label htmlFor="email" className="block text-gray-500 text-lg mb-2 font-sans mt-4 font-semibold">Email</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-lg">
              <Image src={'/icons8-email-24.png'} width={20} height={20} alt="Email icon" />
            </span>
            <input
              id="email"
              name='email'
              type="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}                   
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 text-gray-400 text-lg font-sans placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#646ae8] focus:border-[#646ae8]"
              required
            />
          </div>

          <label htmlFor="password" className="block text-gray-500 text-lg mb-2 font-sans mt-4 font-semibold">Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-lg">
              <Image src={'/icons8-password-24.png'} width={20} height={20} alt="Password icon" />
            </span>
            <input
              id="password"
              name="password"
              type="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}                   
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 text-gray-400 text-lg font-sans placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#646ae8] focus:border-[#646ae8]"
              required
              minLength="6"
            />
          </div>
          
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          {successMessage && <p className="text-green-500 text-center mt-2">{successMessage}</p>}
          
          <button
            type="submit"
            className="w-full flex justify-center py-3 text-[18px] mt-8 font-semibold p-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#646ae8] hover:bg-[#4a50c5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#646ae8]"
          >
            Sign Up
          </button>
          
          <p className="text-center mt-4 text-[#aaaba9]">
            Already have an account? <Link href="/Login" className="text-[#646ae8] font-medium hover:underline">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default page;          