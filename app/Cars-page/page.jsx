'use client'
import React, {useMemo, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '../components/Nav';

const carsData =[
  { id: 7, name: 'Mercedes-Benz C-Class', price: 350, description: 'Elegant luxury sedan with refined performance.', image: '/mercedes-benz-6930824_1280.jpg' },
  { id: 8, name: 'Chevrolet Corvette', price: 400, description: 'Iconic American sports car with stunning design.', image: '/corvette-8930324_1280.jpg' },
  { id: 9, name: 'Jeep Wrangler', price: 250, description: 'Rugged off-road SUV with removable top.', image: '/rubicon-2432058_1280.jpg' },
  { id: 10, name: 'Subaru Outback', price: 180, description: 'All-wheel drive wagon for adventurous drivers.', image: '/subaru-impreza-6964468_1280.jpg' },
  { id: 11, name: 'Volkswagen Golf GTI', price: 220, description: 'Sporty hatchback with excellent handling.', image: '/vw-4332807_1280.jpg' },
  { id: 12, name: 'Porsche 911', price: 600, description: 'Legendary sports car with timeless design.', image: '/porsche-911-turbo-1312279_1280.jpg' },
  { id: 13, name: 'Lexus RX', price: 320, description: 'Luxury SUV with whisper-quiet cabin.', image: '/lexus-1938299_1280.jpg' },
  { id: 14, name: 'Mazda CX-5', price: 200, description: 'Stylish crossover with engaging driving dynamics.', image: '/mazda-mx5-3546782_1280.jpg' },
  { id: 15, name: 'Kia Telluride', price: 280, description: 'Spacious three-row SUV with premium features.', image: '/car-1056653_1280.jpg' },
  { id: 16, name: 'Land Rover Defender', price: 450, description: 'Iconic off-roader with modern luxury.', image: '/land-rover-89210_1280.jpg' },
  { id: 17, name: 'Volvo XC90', price: 380, description: 'Safety-focused luxury SUV with Scandinavian design.', image: '/volvo-2396040_1280.jpg' },
  { id: 18, name: 'Nissan GT-R', price: 500, description: 'Supercar performance with everyday usability.', image: '/car-6893707_1280.jpg' },
  { id: 19, name: 'Toyota RAV4 Hybrid', price: 210, description: 'Fuel-efficient SUV with excellent reliability.', image: '/toyota-rav-4-5272096_1280.jpg' },
  { id: 20, name: 'Ford F-150', price: 230, description: 'America\'s best-selling pickup truck.', image: '/f150-7572360_1280.jpg' },
  { id: 21, name: 'Dodge Challenger', price: 280, description: 'Muscle car with retro styling.', image: '/car-5161457_1280.jpg' },
  { id: 22, name: 'Cadillac Escalade', price: 420, description: 'Luxury full-size SUV with bold presence.', image: '/cadillac-escalade-5264974_1280.jpg' },
  { id: 23, name: 'Jaguar F-Type', price: 480, description: 'British sports car with gorgeous styling.', image: '/jaguar-1076206_1280.jpg' },
  { id: 24, name: 'Hyundai Santa Fe', price: 190, description: 'Comfortable family SUV with great value.', image: '/vehicle-7840524_1280.jpg' },
  { id: 25, name: 'Audi R8', price: 650, description: 'Exotic supercar with everyday usability.', image: '/audi-1491177_1280.jpg' },
  { id: 26, name: 'Tesla Model S', price: 350, description: 'Luxury electric sedan with incredible range.', image: '/tesla-5937063_1280.jpg' },
  { id: 27, name: 'Chevrolet Tahoe', price: 270, description: 'Full-size SUV with massive interior space.', image: '/sports-car-4826752_1280.jpg' },
  { id: 28, name: 'BMW 3 Series', price: 310, description: 'Sporty luxury sedan with precise handling.', image: '/car-7227552_1280.jpg' },
  { id: 29, name: 'Mercedes-Benz GLE', price: 390, description: 'Mid-size luxury SUV with cutting-edge tech.', image: '/mercedes-benz-1036358_1280.jpg' },
  { id: 30, name: 'Toyota Tacoma', price: 220, description: 'Midsize pickup truck built for adventure.', image: '/car-8446529_1280.jpg' },
  { id: 31, name: 'Honda Civic Type R', price: 240, description: 'Hot hatch with track-ready performance.', image: '/honda-4384888_1280.jpg' },
  { id: 32, name: 'Porsche Taycan', price: 420, description: 'Electric sports sedan with blistering speed.', image: '/porsche-boxter-4032307_1280.jpg' },
  { id: 33, name: 'Subaru WRX STI', price: 260, description: 'Rally-bred sports sedan with all-wheel drive.', image: '/subaru-1204883_1280.jpg' },
  
]

const page = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCars = useMemo(() => {
    if(!searchTerm) return carsData;
    return carsData.filter(cars => cars.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  return (
    <div className="">
      <Nav /> {/* Moved Nav outside the main container to allow full-width header */}
      
      <div className="relative"> {/* New wrapper div for the sticky header */}
        <header className='sticky top-0 p-4 bg-white shadow-sm z-10'>
          <div className="relative flex items-center max-w-xl mx-auto">
            <input
              type="text"
              className="w-full p-3 pl-10 pr-10 rounded-full border-2 border-gray-200 focus:border-[#646ae8] focus:outline-none transition-colors duration-200 placeholder:text-[#646ae8] font-medium"
              placeholder="Search for cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Image 
              src={'/icons8-search-50 (1).png'} 
              height={20} 
              width={20} 
              className="absolute right-4"
              alt="Search icon"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 text-gray-400"
              >
                ✕
              </button>
            )}
          </div>
        </header>

        <div className='px-4 md:px-6 lg:px-8 pt-4'> {/* Changed mt-7 to pt-4 */}
          <section className="mt-6">
            <div>
              <h1 className='font-bold text-xl md:text-2xl text-center'>Cars</h1>
            </div>

            <div className='p-3 mt-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {filteredCars.length === 0 ? (
                <p className="text-center text-gray-600 col-span-full">No cars found matching your search.</p>
              ) : (
                filteredCars.map(cars => (
                  <div key={cars.id} className="border-grey-300 border rounded-lg shadow-lg  bg-white flex flex-col hover:shadow-xl transition-shadow duration-200">
                    <div className="relative w-full aspect-[4/3] mb-4 rounded overflow-hidden top-0"> {/* Changed to aspect ratio */}
                      <Image
                        src={cars.image}
                        alt={cars.name}
                        fill
                        style={{objectFit: 'cover'}}
                        className="rounded"
                        
                        priority={cars.id <= 4} // Optional: prioritize loading first few images
                      />
                    </div>
                    <div className="px-4 flex-grow">
                      <h2 className="text-xl text-black font-bold">{cars.name}</h2>
                      <p className="font-bold text-[21px] text-[#646ae8]"> ${cars.price} /day</p>
                      <p className="text-gray-600 mt-2 mb-4">{cars.description}</p>
                    </div>
                    <div className="px-4 pb-4">
                      <Link href={`/cars/${cars.id}`} className="float-right">
                        <p className="inline-block border-[#646ae8] border-2 bg-white font-semibold rounded px-4 py-2 text-center text-[#646ae8] hover:bg-[#646ae8] hover:text-white transition-colors duration-200">
                          View Car Details
                        </p>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default page