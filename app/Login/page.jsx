'use client'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { auth } from '@/firebaseConfig'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/Home')
    } catch (error) {
      console.error('Login error:', error)
      let errorMessage = 'Failed to log in'
      
      // Specific error messages
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email'
          break
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password'
          break
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Account temporarily disabled'
          break
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled'
          break
        default:
          errorMessage = 'Login failed. Please try again'
      }
      
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='pt-10 px-4'>
        <div className='font-bold text-[22px] text-black text-center'>Login</div> 
        <hr className='mt-4 border-gray-200' />          
      </header>
      
      <div className='px-4 py-8 max-w-md mx-auto'>
        <section className='text-center mb-8'>
          <h1 className='text-black font-bold text-[30px] mb-2'>Log in to Your Account</h1>  
          <p className='text-[#aaaba9] font-semibold'>Join CarRentify Rentals and find your perfect ride!</p>        
        </section>
        
        <form onSubmit={handleSignIn} className='space-y-4'>
          <div>
            <label htmlFor="email" className="block text-gray-500 text-lg mb-2 font-semibold">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <Image 
                  src='/icons8-customer-24.png' 
                  width={20} 
                  height={20} 
                  alt="Email icon" 
                />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}                   
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 text-gray-700 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#646ae8] focus:border-[#646ae8]"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-gray-500 text-lg mb-2 font-semibold">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <Image 
                  src='/icons8-email-24.png' 
                  width={20} 
                  height={20} 
                  alt="Password icon" 
                />
              </span>
              <input
                id="password"
                name="password"
                type="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}                   
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 text-gray-700 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#646ae8] focus:border-[#646ae8]"
                required
                minLength={6}
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-center">
              {error}
            </div>
          )}
          
          <div className='pt-2'>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 text-[18px] font-semibold rounded-md shadow-sm text-white bg-[#646ae8] hover:bg-[#4a50c5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#646ae8] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </>
              ) : 'Sign In'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <Link 
            href="/forgot-password" 
            className="text-[#646ae8] font-medium hover:text-[#4a50c5]"
          >
            Forgot password?
          </Link>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link 
              href="/SignUpconsole.log('Email:', email)
console.log('Password:', password)
console.log('Error:', error)
console.log('Is Loading:', isLoading)" 
              className="text-[#646ae8] font-medium hover:text-[#4a50c5]"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage