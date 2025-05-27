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
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-black">Your Bookings</h1>
        
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg mb-4">You haven't made any bookings yet.</p>
            <Link href="/" className="text-[#646ae8] font-semibold">
              Browse available cars
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking, index) => (
              <div key={index} className="border pb-2 rounded-lg  flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/4 h-50 bg-gray-100 rounded overflow-hidden">
                  <img 
                    src={booking.image} 
                    alt={booking.carName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 px-3">
                  <h2 className="text-xl font-bold text-black">{booking.carName}</h2>
                  <p className="text-[#646ae8] font-semibold">${booking.price}/day</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-500 font-semibold">Booking Dates</p>
                      <p className='text-[#aaaba9]'>
                        {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-semibold">Booked On</p>
                      <p className='text-[#aaaba9]'>{formatDateTime(booking.bookedAt)}</p>
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
