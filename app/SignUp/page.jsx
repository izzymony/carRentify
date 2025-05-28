'use client';

import React,{useState} from 'react'
import {useRouter} from 'next/navigation'
import {useAuth} from '../context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
const page = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('')
   const[name,setName] = useState ('');
   const {signUp} = useAuth()
   const router = useRouter()  
   const handleSubmit = async (e) => {
      e.preventDefault() ;
      
      setError('');
      try{
         await signUp(email, password);

      } catch (error){
              setError(error.message('please fill the required field'));
      }
   }         
  return (
    <div>
      <div className=' px-4'>
          <form class="max-w-md">
    <label htmlFor="name" class="block text-gray-500 text-lg mb-2 font-sans">Name</label>
    <div class="relative">
      <span class="absolute inset-y-0 left-3 flex items-center text-gray-400 text-lg">
        <Image src={'/icons8-customer-24.png'}  />
      </span>
      <input
        id="name"
        name="name"
        type="text"
        value={name} 
        onChange={(e) => setName(e.target.value)}                   
        placeholder="Enter your name"
        class="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 text-gray-400 text-lg font-sans placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </form>

     
      </div>
    </div>
  )
}

export default page
