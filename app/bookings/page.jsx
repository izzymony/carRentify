'use client'
import React from 'react'

import Nav from '../components/Nav'
import Link from 'next/link'
import { useEffect, useState } from 'react'
const page = () => { const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(savedBookings);
  }, []);

  const formatDate = (dateString) =>{
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };
  return (
    <div>
      <Nav />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
  <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-black">Your Bookings</h1>
  
  {bookings.length === 0 ? (
    <div className="text-center py-12">
      <p className="text-base sm:text-lg mb-4">You haven't made any bookings yet.</p>
      <Link href="/" className="text-[#646ae8] font-semibold hover:underline">
        Browse available cars
      </Link>
    </div>
  ) : (
    <div className="grid gap-4 sm:gap-6">
      {bookings.map((booking, index) => (
        <div 
          key={index} 
          className="border rounded-lg overflow-hidden flex flex-col sm:flex-row gap-0 sm:gap-4 hover:shadow-md transition-shadow"
        >
          <div className="w-full sm:w-1/4 h-48 sm:h-auto bg-gray-100">
            <img 
              src={booking.image} 
              alt={booking.carName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-4 sm:p-0 sm:pr-4 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-black">{booking.carName}</h2>
              <p className="text-[#646ae8] font-semibold">${booking.price}/day</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 sm:mt-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-500 font-semibold">Booking Dates</p>
                <p className='text-sm sm:text-base text-[#aaaba9]'>
                  {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500 font-semibold">Booked On</p>
                <p className='text-sm sm:text-base text-[#aaaba9]'>{formatDateTime(booking.bookedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
    </div>
  )
}

export default page
