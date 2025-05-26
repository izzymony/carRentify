'use client'; 
 import React from 'react'

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('JFK');
  const [pickupDate, setPickupDate] = useState(new Date());
  const [dropoffDate, setDropoffDate] = useState(new Date(Date.now() + 86400000 * 3)); // +3 da          
  
  const searchCars = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        location,
        from: pickupDate.toISOString(),
        to: dropoffDate.toISOString()
      });

      const response = await fetch(`/api/cars?${params}`);
      const data = await response.json();
      setCars(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Car Rentals</h1>
      
      {/* Search Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block mb-2 font-medium">Location (Airport Code)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value.toUpperCase())}
              className="w-full p-2 border rounded"
              placeholder="JFK, LAX, etc."
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Pick-Up</label>
            <DatePicker
              selected={pickupDate}
              onChange={(date) => setPickupDate(date)}
              showTimeSelect
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Drop-Off</label>
            <DatePicker
              selected={dropoffDate}
              onChange={(date) => setDropoffDate(date)}
              showTimeSelect
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={searchCars}
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white ${
                loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Searching...' : 'Search Cars'}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {cars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="border rounded-lg overflow-hidden shadow-lg">
              <div className="p-4">
                <h2 className="text-xl font-bold">{car.vehicle?.model || 'Unknown Model'}</h2>
                <p className="text-blue-600 font-semibold my-2">
                  ${car.price?.totalAmount} {car.price?.currency}
                </p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Provider: {car.provider?.name}</p>
                  <p>Type: {car.vehicle?.type}</p>
                  <p>Transmission: {car.vehicle?.transmission || 'Automatic'}</p>
                </div>
                <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-gray-500">No cars available. Try another search.</p>
      )}
    </div>
  );
}

export default cars
