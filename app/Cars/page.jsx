'use client'
import React,{useMemo, useState}from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '../components/Nav';

const carsData =[
  { id: 1, name: 'Mercedes-Benz C-Class', price: 350, description: 'Elegant luxury sedan with refined performance.', image: '/mercedes-benz-6930824_1280.jpg' },
  { id: 2, name: 'Chevrolet Corvette', price: 400, description: 'Iconic American sports car with stunning design.', image: '/corvette-8930324_1280.jpg' },
  { id: 3, name: 'Jeep Wrangler', price: 250, description: 'Rugged off-road SUV with removable top.', image: '/rubicon-2432058_1280.jpg' },
  { id: 4, name: 'Subaru Outback', price: 180, description: 'All-wheel drive wagon for adventurous drivers.', image: '/subaru-impreza-6964468_1280.jpg' },
  { id: 5, name: 'Volkswagen Golf GTI', price: 220, description: 'Sporty hatchback with excellent handling.', image: '/vw-4332807_1280.jpg' },
  { id: 6, name: 'Porsche 911', price: 600, description: 'Legendary sports car with timeless design.', image: '/porsche-911-turbo-1312279_1280.jpg' },
  { id: 7, name: 'Lexus RX', price: 320, description: 'Luxury SUV with whisper-quiet cabin.', image: '/lexus-1938299_1280.jpg' },
  { id: 8, name: 'Mazda CX-5', price: 200, description: 'Stylish crossover with engaging driving dynamics.', image: '/mazda-mx5-3546782_1280.jpg' },
  { id: 9, name: 'Kia Telluride', price: 280, description: 'Spacious three-row SUV with premium features.', image: '/car-1056653_1280.jpg' },
  { id: 10, name: 'Land Rover Defender', price: 450, description: 'Iconic off-roader with modern luxury.', image: '/land-rover-89210_1280.jpg' },
  { id: 11, name: 'Volvo XC90', price: 380, description: 'Safety-focused luxury SUV with Scandinavian design.', image: '/volvo-2396040_1280.jpg' },
  { id: 12, name: 'Nissan GT-R', price: 500, description: 'Supercar performance with everyday usability.', image: '/car-6893707_1280.jpg' },
  { id: 13, name: 'Toyota RAV4 Hybrid', price: 210, description: 'Fuel-efficient SUV with excellent reliability.', image: '/toyota-rav-4-5272096_1280.jpg' },
  { id: 14, name: 'Ford F-150', price: 230, description: 'America\'s best-selling pickup truck.', image: '/f150-7572360_1280.jpg' },
  { id: 15, name: 'Dodge Challenger', price: 280, description: 'Muscle car with retro styling.', image: '/car-5161457_1280.jpg' },
  { id: 16, name: 'Cadillac Escalade', price: 420, description: 'Luxury full-size SUV with bold presence.', image: '/cadillac-escalade-5264974_1280.jpg' },
  { id: 17, name: 'Jaguar F-Type', price: 480, description: 'British sports car with gorgeous styling.', image: '/jaguar-1076206_1280.jpg' },
  { id: 18, name: 'Hyundai Santa Fe', price: 190, description: 'Comfortable family SUV with great value.', image: '/vehicle-7840524_1280.jpg' },
  { id: 19, name: 'Audi R8', price: 650, description: 'Exotic supercar with everyday usability.', image: '/audi-1491177_1280.jpg' },
  { id: 20, name: 'Tesla Model S', price: 350, description: 'Luxury electric sedan with incredible range.', image: '/tesla-5937063_1280.jpg' },
  { id: 21, name: 'Chevrolet Tahoe', price: 270, description: 'Full-size SUV with massive interior space.', image: '/sports-car-4826752_1280.jpg' },
  { id: 22, name: 'BMW 3 Series', price: 310, description: 'Sporty luxury sedan with precise handling.', image: '/car-7227552_1280.jpg' },
  { id: 23, name: 'Mercedes-Benz GLE', price: 390, description: 'Mid-size luxury SUV with cutting-edge tech.', image: '/mercedes-benz-1036358_1280.jpg' },
  { id: 24, name: 'Toyota Tacoma', price: 220, description: 'Midsize pickup truck built for adventure.', image: '/car-8446529_1280.jpg' },
  { id: 25, name: 'Honda Civic Type R', price: 240, description: 'Hot hatch with track-ready performance.', image: '/honda-4384888_1280.jpg' },
  { id: 26, name: 'Porsche Taycan', price: 420, description: 'Electric sports sedan with blistering speed.', image: '/porsche-boxter-4032307_1280.jpg' },
  { id: 27, name: 'Subaru WRX STI', price: 260, description: 'Rally-bred sports sedan with all-wheel drive.', image: '/subaru-1204883_1280.jpg' },
  
]

const page = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCars = useMemo (() => {
      if(!searchTerm) return carsData;
      return carsData.filter(car => car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  }, [searchTerm]);
  return (
    <div>
      <div>
        <Nav />
       
        <div className='px-4 mt-7'>
 <header>
          <div className=' mt-10  p-3 t0p-0 z-10 overflow-hidden bg-white fixed w-full'>
         <input
  type="text"
  className="shadow-lg text-[#aaaba9]  w-[300px]  p-4 rounded-full border border-gray-300 hover:border-[#646ae8] hover:border-4 focus:border-[#646ae8] focus:border-2 focus:outline-none transition-colors duration-200 placeholder:text-[#646ae8] font-medium"
  placeholder="Search for cars..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  onKeyDown={(e) => {if(e.key === 'Enter') e.preventDefault();}}
/>

<Image src={'/icons8-search-50 (1).png'} height={20} width={20} className='absolute right-7 -mt-9' type="button" onClick={() => {}} />
</div>
   </header>
   
        <section>
          <div>
            <h1 className='font-bold text-xl text-center'>Cars</h1>
          </div>

          <div className='p-3 mt-1 grid grid-cols-1'>
          {filteredCars.length === 0 ? (
  <p className="text-center text-gray-600 col-span-full">No cars found matching your search.</p>
) : (
  filteredCars.map(car => (
    <div key={car.id} className="border-grey-300 border- rounded-lg mt-5 shadow-lg  py-4 bg-white flex flex-col">
      <div className="relative w-full h-48 mb-4 rounded overflow-hidden">
        <Image
          src={car.image}
          alt={car.name}
          layout="fill" // This makes the image fill the container
          objectFit="cover" // This ensures the image covers the container without distortion
          className="rounded w-full object-cover " // Optional: to keep the corners rounded
          
        />
      </div>
      <div className=" px-4">
      <h2 className="text-xl text-black font-bold">{car.name}</h2>
      <p className=" font-bold text-[21px] text-[#646ae8]"> ${car.price} /day</p>
      <p className="text-gray-600 flex-grow">{car.description}</p>
      <Link href={`/car/${car.id}`} className="py-4 float-right relative right-2">
        <p className="mt-4 inline-block border-[#646ae8] border-2  bg-white font-semibold rounded px-4 py-2 text-center text-[#646ae8]">View Car Details</p>
       
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
