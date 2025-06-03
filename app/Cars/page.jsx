'use client'
import React,{useState}from 'react';
import Image from 'next/image';
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
  { id: 24, name: 'Toyota Tacoma', price: 220, description: 'Midsize pickup truck built for adventure.', image: '/toyota-3602380_1280.jpg' },
  { id: 25, name: 'Honda Civic Type R', price: 240, description: 'Hot hatch with track-ready performance.', image: '/honda-1204881_1280.jpg' },
  { id: 26, name: 'Porsche Taycan', price: 420, description: 'Electric sports sedan with blistering speed.', image: '/porsche-1204882_1280.jpg' },
  { id: 27, name: 'Subaru WRX STI', price: 260, description: 'Rally-bred sports sedan with all-wheel drive.', image: '/subaru-1204883_1280.jpg' },
  { id: 28, name: 'Ford Bronco', price: 290, description: 'Off-road SUV with retro-modern styling.', image: '/ford-1204884_1280.jpg' },
  { id: 29, name: 'Lamborghini Huracan', price: 800, description: 'Exotic supercar with screaming V10 engine.', image: '/lamborghini-1204885_1280.jpg' },
  { id: 30, name: 'Jeep Grand Cherokee', price: 240, description: 'Capable SUV with premium interior options.', image: '/jeep-1204886_1280.jpg' },
  { id: 31, name: 'Aston Martin DB11', price: 750, description: 'British grand tourer with stunning looks.', image: '/aston-martin-1204887_1280.jpg' },
  { id: 32, name: 'Maserati Levante', price: 480, description: 'Italian luxury SUV with sporty character.', image: '/maserati-1204888_1280.jpg' },
  { id: 33, name: 'Rolls-Royce Phantom', price: 1200, description: 'Ultimate luxury sedan with unparalleled comfort.', image: '/rolls-royce-1204889_1280.jpg' }
]

const page = () => {
  return (
    <div>
      <div>
        <Nav />
        <div className=''>
          
        </div>
      </div>
    </div>
  )
}

export default page
