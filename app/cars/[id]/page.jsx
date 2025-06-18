'use client'
import React, { useState} from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/app/components/Nav'


const carsData = [
  { 
    id: 7, 
    name: 'Mercedes-Benz C-Class', 
    price: 350, 
    description: 'Elegant luxury sedan with refined performance.', 
    image: '/mercedes-benz-6930824_1280.jpg',
    features: [
      'Premium leather upholstery',
      'Burmester surround sound system',
      '64-color ambient lighting',
      'Heated and ventilated front seats',
      'MBUX infotainment with voice control',
      '12.3-inch digital instrument cluster',
      'Active parking assist',
      'Keyless-go entry',
      'Panoramic sunroof',
      'Wireless charging pad'
    ],
    specs: {
      engine: '2.0L Turbo I4 (255 HP)',
      mileage: '25 city / 35 highway mpg',
      year: 2023,
      transmission: '9-speed automatic',
      seats: 5,
      drivetrain: 'RWD/AWD',
      fuel: 'Premium unleaded',
      cargo: '12.6 cu ft'
    }
  },
  { 
    id: 8, 
    name: 'Chevrolet Corvette', 
    price: 400, 
    description: 'Iconic American sports car with stunning design.', 
    image: '/corvette-8930324_1280.jpg',
    features: [
      '6.2L LT2 V8 engine (495 HP)',
      'Performance exhaust system',
      'Heads-up display with track mode',
      'GT2 bucket seats with Nappa leather',
      'Bose 14-speaker premium audio',
      'Magnetic ride control 4.0',
      'Front lift system',
      'Digital rearview mirror',
      'Performance data recorder',
      'Carbon fiber interior trim'
    ],
    specs: {
      engine: '6.2L V8 (495 HP)',
      mileage: '16 city / 25 highway mpg',
      year: 2023,
      transmission: '8-speed dual-clutch',
      seats: 2,
      drivetrain: 'RWD',
      fuel: 'Premium unleaded',
      cargo: '12.6 cu ft'
    }
  },
  { 
    id: 9, 
    name: 'Jeep Wrangler', 
    price: 250, 
    description: 'Rugged off-road SUV with removable top.', 
    image: '/rubicon-2432058_1280.jpg',
    features: [
      'Removable doors and Freedom Top',
      'Rock-Trac 4WD system',
      'Tru-Lok locking differentials',
      'Electronic sway bar disconnect',
      '8.4-inch Uconnect touchscreen',
      'Alpine premium audio system',
      'Trail-rated off-road capability',
      'Water-resistant interior',
      'Steel bumpers with winch',
      'All-terrain tires'
    ],
    specs: {
      engine: '3.6L V6 (285 HP)',
      mileage: '17 city / 23 highway mpg',
      year: 2023,
      transmission: '8-speed automatic',
      seats: 5,
      drivetrain: '4WD',
      fuel: 'Regular unleaded',
      cargo: '31.7 cu ft'
    }
  },
  { 
    id: 10, 
    name: 'Subaru Outback', 
    price: 180, 
    description: 'All-wheel drive wagon for adventurous drivers.', 
    image: '/subaru-impreza-6964468_1280.jpg',
    features: [
      'Standard Symmetrical AWD',
      'X-Mode with hill descent control',
      'EyeSight Driver Assist Technology',
      'Harman Kardon 12-speaker audio',
      'StarTex waterproof upholstery',
      '11.6-inch touchscreen display',
      'Roof rails with crossbars',
      'Heated steering wheel',
      'Rear automatic braking',
      'LED steering responsive headlights'
    ],
    specs: {
      engine: '2.4L Turbo H4 (260 HP)',
      mileage: '26 city / 32 highway mpg',
      year: 2023,
      transmission: 'CVT automatic',
      seats: 5,
      drivetrain: 'AWD',
      fuel: 'Regular unleaded',
      cargo: '32.5 cu ft'
    }
  },
  { 
    id: 11, 
    name: 'Volkswagen Golf GTI', 
    price: 220, 
    description: 'Sporty hatchback with excellent handling.', 
    image: '/vw-4332807_1280.jpg',
    features: [
      '2.0L TSI turbocharged engine',
      'Sport-tuned suspension',
      'Plaid cloth sport seats',
      '10.25-inch Digital Cockpit',
      'Fender premium audio system',
      'Performance package brakes',
      'Lighting package with LEDs',
      'Dual-zone climate control',
      'Launch control system',
      'XDS electronic differential'
    ],
    specs: {
      engine: '2.0L Turbo I4 (241 HP)',
      mileage: '24 city / 34 highway mpg',
      year: 2023,
      transmission: '6-speed manual',
      seats: 5,
      drivetrain: 'FWD',
      fuel: 'Premium unleaded',
      cargo: '19.9 cu ft'
    }
  },
  { 
    id: 12, 
    name: 'Porsche 911', 
    price: 600, 
    description: 'Legendary sports car with timeless design.', 
    image: '/porsche-911-turbo-1312279_1280.jpg',
    features: [
      'Rear-engine sports car layout',
      'Active aerodynamics with spoiler',
      'Sport Chrono package with mode switch',
      'Porsche Ceramic Composite Brakes',
      'Bose surround sound system',
      'GT sport steering wheel',
      'Porsche Active Suspension Management',
      'Night vision assist',
      '18-way adaptive sport seats',
      'Porsche Torque Vectoring Plus'
    ],
    specs: {
      engine: '3.0L Twin-Turbo H6 (379 HP)',
      mileage: '18 city / 24 highway mpg',
      year: 2023,
      transmission: '8-speed PDK',
      seats: 4,
      drivetrain: 'AWD',
      fuel: 'Premium unleaded',
      cargo: '4.6 cu ft'
    }
  },
  { 
    id: 13, 
    name: 'Lexus RX', 
    price: 320, 
    description: 'Luxury SUV with whisper-quiet cabin.', 
    image: '/lexus-1938299_1280.jpg',
    features: [
      'Mark Levinson premium audio',
      'Semi-aniline leather seats',
      'Heated and ventilated front seats',
      '12.3-inch touchscreen display',
      'Panoramic view monitor',
      'Triple-beam LED headlights',
      'Hands-free power liftgate',
      'Rain-sensing wipers',
      'Wireless charging pad',
      'Digital rearview mirror'
    ],
    specs: {
      engine: '3.5L V6 (295 HP)',
      mileage: '20 city / 27 highway mpg',
      year: 2023,
      transmission: '8-speed automatic',
      seats: 5,
      drivetrain: 'AWD',
      fuel: 'Premium unleaded',
      cargo: '16 cu ft'
    }
  },
  { 
    id: 14, 
    name: 'Mazda CX-5', 
    price: 200, 
    description: 'Stylish crossover with engaging driving dynamics.', 
    image: '/mazda-mx5-3546782_1280.jpg',
    features: [
      'Skyactiv-G 2.5L turbo engine',
      'i-Activ AWD system',
      '10.25-inch infotainment display',
      'Bose 10-speaker audio system',
      'Leather-trimmed seats',
      'Power liftgate',
      'Adaptive front lighting',
      'Heated steering wheel',
      '360-degree view monitor',
      'Traffic jam assist'
    ],
    specs: {
      engine: '2.5L Turbo I4 (227 HP)',
      mileage: '22 city / 27 highway mpg',
      year: 2023,
      transmission: '6-speed automatic',
      seats: 5,
      drivetrain: 'AWD',
      fuel: 'Regular unleaded',
      cargo: '30.9 cu ft'
    }
  },
  { 
    id: 15, 
    name: 'Kia Telluride', 
    price: 280, 
    description: 'Spacious three-row SUV with premium features.', 
    image: '/car-1056653_1280.jpg',
    features: [
      '10.25-inch touchscreen navigation',
      'Harmon Kardon premium audio',
      'Nappa leather seating surfaces',
      'Smart power liftgate',
      'Heated and ventilated front seats',
      'Second-row captain chairs',
      'Surround view monitor',
      'Highway driving assist',
      'Blind-spot view monitor',
      'Multi-zone climate control'
    ],
    specs: {
      engine: '3.8L V6 (291 HP)',
      mileage: '20 city / 26 highway mpg',
      year: 2023,
      transmission: '8-speed automatic',
      seats: 7,
      drivetrain: 'AWD',
      fuel: 'Regular unleaded',
      cargo: '21 cu ft (87 with seats down)'
    }
  },
  { 
    id: 16, 
    name: 'Land Rover Defender', 
    price: 450, 
    description: 'Iconic off-roader with modern luxury.', 
    image: '/land-rover-89210_1280.jpg',
    features: [
      'Terrain Response 2 system',
      'ClearSight ground view',
      'Wade sensing capability',
      'Meridian 3D surround sound',
      'Configurable terrain response',
      'Air suspension with clearance',
      'Activity key waterproof wearable',
      'Loadspace storage solutions',
      'Interactive driver display',
      'Matrix LED headlights'
    ],
    specs: {
      engine: '3.0L Turbo I6 (395 HP)',
      mileage: '17 city / 22 highway mpg',
      year: 2023,
      transmission: '8-speed automatic',
      seats: 7,
      drivetrain: '4WD',
      fuel: 'Premium unleaded',
      cargo: '34 cu ft'
    }
  },
  { 
    id: 17, 
    name: 'Volvo XC90', 
    price: 380, 
    description: 'Safety-focused luxury SUV with Scandinavian design.', 
    image: '/volvo-2396040_1280.jpg',
    features: [
      'Pilot Assist semi-autonomous driving',
      'Bowers & Wilkins premium sound',
      'Nappa leather ventilated seats',
      '12.3-inch digital driver display',
      'CleanZone air quality system',
      'Pilot Assist with adaptive cruise',
      'Power-operated tailgate',
      'Four-zone climate control',
      '360-degree surround view camera',
      'Run-off road mitigation'
    ],
    specs: {
      engine: '2.0L Turbo/Supercharged I4 (316 HP)',
      mileage: '21 city / 30 highway mpg',
      year: 2023,
      transmission: '8-speed automatic',
      seats: 7,
      drivetrain: 'AWD',
      fuel: 'Premium unleaded',
      cargo: '15.8 cu ft'
    }
  },
  { 
    id: 18, 
    name: 'Nissan GT-R', 
    price: 500, 
    description: 'Supercar performance with everyday usability.', 
    image: '/car-6893707_1280.jpg',
    features: [
      '3.8L twin-turbo V6 (565 HP)',
      'ATTESA E-TS all-wheel drive',
      '6-speed dual-clutch transmission',
      'Recaro leather-appointed seats',
      '11-speaker Bose audio system',
      'Active noise cancellation',
      'Multimode suspension',
      'Launch control system',
      'Brembo carbon-ceramic brakes',
      'Dry carbon fiber rear spoiler'
    ],
    specs: {
      engine: '3.8L Twin-Turbo V6 (565 HP)',
      mileage: '16 city / 22 highway mpg',
      year: 2023,
      transmission: '6-speed dual-clutch',
      seats: 4,
      drivetrain: 'AWD',
      fuel: 'Premium unleaded',
      cargo: '8.8 cu ft'
    }
  },
  { 
    id: 19, 
    name: 'Toyota RAV4 Hybrid', 
    price: 210, 
    description: 'Fuel-efficient SUV with excellent reliability.', 
    image: '/toyota-rav-4-5272096_1280.jpg',
    features: [
      'Hybrid Synergy Drive system',
      'Electronic on-demand AWD',
      '7-inch multi-information display',
      'SofTex-trimmed seats',
      'Smart key system',
      'Power liftgate',
      'Toyota Safety Sense 2.5',
      'Adaptive cruise control',
      'Lane tracing assist',
      'Automatic high beams'
    ],
    specs: {
      engine: '2.5L 4-cyl Hybrid (219 HP)',
      mileage: '41 city / 38 highway mpg',
      year: 2023,
      transmission: 'eCVT automatic',
      seats: 5,
      drivetrain: 'AWD',
      fuel: 'Regular unleaded',
      cargo: '37.6 cu ft'
    }
  },
  { 
    id: 20, 
    name: 'Ford F-150', 
    price: 230, 
    description: 'America\'s best-selling pickup truck.', 
    image: '/f150-7572360_1280.jpg',
    features: [
      '3.5L EcoBoost V6 engine',
      'Pro Power Onboard generator',
      'Ford Co-Pilot360 Assist+',
      '12-inch touchscreen display',
      'B&O sound system',
      'Max Recline front seats',
      'Integrated trailer brake controller',
      '360-degree camera system',
      'Lockable storage bins',
      'Twin-panel moonroof'
    ],
    specs: {
      engine: '3.5L EcoBoost V6 (400 HP)',
      mileage: '20 city / 24 highway mpg',
      year: 2023,
      transmission: '10-speed automatic',
      seats: 6,
      drivetrain: '4WD',
      fuel: 'Regular unleaded',
      cargo: '52.8 cu ft (bed)'
    }
  },
  { 
    id: 21, 
    name: 'Dodge Challenger', 
    price: 280, 
    description: 'Muscle car with retro styling.', 
    image: '/car-5161457_1280.jpg',
    features: [
      '5.7L HEMI V8 (375 HP)',
      'Active exhaust system',
      'Performance suspension',
      'Uconnect 4C Navigation',
      'Alpine premium audio',
      'Performance pages',
      'Line lock launch system',
      'Suede/leather interior',
      'Performance spoiler',
      'Dual hood scoops'
    ],
    specs: {
      engine: '5.7L HEMI V8 (375 HP)',
      mileage: '16 city / 25 highway mpg',
      year: 2023,
      transmission: '8-speed automatic',
      seats: 5,
      drivetrain: 'RWD',
      fuel: 'Premium unleaded',
      cargo: '16.2 cu ft'
    }
  },
  { 
    id: 22, 
    name: 'Cadillac Escalade', 
    price: 420, 
    description: 'Luxury full-size SUV with bold presence.', 
    image: '/cadillac-escalade-5264974_1280.jpg',
    features: [
      '6.2L V8 engine (420 HP)',
      'Magnetic Ride Control',
      'AKG 36-speaker audio system',
      '38-inch curved OLED display',
      'Super Cruise hands-free driving',
      'Air Ride adaptive suspension',
      'Heated/cooled/massaging seats',
      'Night vision camera',
      'Rear seat entertainment',
      'Power retractable running boards'
    ],
    specs: {
      engine: '6.2L V8 (420 HP)',
      mileage: '15 city / 20 highway mpg',
      year: 2023,
      transmission: '10-speed automatic',
      seats: 7,
      drivetrain: '4WD',
      fuel: 'Premium unleaded',
      cargo: '25.5 cu ft'
    }
  },
  { 
    id: 23, 
    name: 'Jaguar F-Type', 
    price: 480, 
    description: 'British sports car with gorgeous styling.', 
    image: '/jaguar-1076206_1280.jpg',
    features: [
      '5.0L supercharged V8 (575 HP)',
      'Active sports exhaust',
      'Configurable dynamics',
      '12.3-inch interactive driver display',
      'Meridian surround sound',
      'Performance seats',
      'JaguarDrive Control',
      'Torque vectoring by braking',
      'Auto-deploying rear spoiler',
      'Laser headlights'
    ],
    specs: {
      engine: '5.0L Supercharged V8 (575 HP)',
      mileage: '16 city / 24 highway mpg',
      year: 2023,
      transmission: '8-speed automatic',
      seats: 2,
      drivetrain: 'AWD',
      fuel: 'Premium unleaded',
      cargo: '11.8 cu ft'
    }
  },
  { 
    id: 24, 
    name: 'Hyundai Santa Fe', 
    price: 190, 
    description: 'Comfortable family SUV with great value.', 
    image: '/vehicle-7840524_1280.jpg',
    features: [
      '2.5L turbocharged engine',
      'HTRAC all-wheel drive',
      '10.25-inch touchscreen nav',
      'Harmon Kardon premium audio',
      'Heated/ventilated front seats',
      'Smart power liftgate',
      'Hyundai SmartSense safety',
      'Blind-spot view monitor',
      'Remote start',
      'Rain-sensing wipers'
    ],
    specs: {
      engine: '2.5L Turbo I4 (281 HP)',
      mileage: '22 city / 28 highway mpg',
      year: 2023,
      transmission: '8-speed DCT',
      seats: 5,
      drivetrain: 'AWD',
      fuel: 'Regular unleaded',
      cargo: '36.4 cu ft'
    }
  },
  { 
    id: 25, 
    name: 'Audi R8', 
    price: 650, 
    description: 'Exotic supercar with everyday usability.', 
    image: '/audi-1491177_1280.jpg',
    features: [
      '5.2L V10 engine (562 HP)',
      'Quattro all-wheel drive',
      'Audi Virtual Cockpit',
      'Bang & Olufsen sound system',
      'Magnetic ride suspension',
      'Carbon fiber side blades',
      'Audi drive select',
      'Dynamic steering',
      'Ceramic brakes',
      'LED Matrix headlights'
    ],
    specs: {
      engine: '5.2L V10 (562 HP)',
      mileage: '14 city / 22 highway mpg',
      year: 2023,
      transmission: '7-speed dual-clutch',
      seats: 2,
      drivetrain: 'AWD',
      fuel: 'Premium unleaded',
      cargo: '8.4 cu ft'
    }
  },
  { 
    id: 26, 
    name: 'Tesla Model S', 
    price: 350, 
    description: 'Luxury electric sedan with incredible range.', 
    image: '/tesla-5937063_1280.jpg',
    features: [
      'Long Range battery (405 miles)',
      'Plaid powertrain (1,020 HP)',
      '17-inch touchscreen display',
      '22-speaker audio system',
      'Autopilot capabilities',
      'Yoke steering wheel',
      'Tri-motor AWD',
      '0-60 mph in 1.99 seconds',
      'Premium interior materials',
      'Over-the-air updates'
    ],
    specs: {
      engine: 'Tri-motor electric',
      mileage: '120 MPGe combined',
      year: 2023,
      transmission: 'Single-speed automatic',
      seats: 5,
      drivetrain: 'AWD',
      fuel: 'Electric',
      cargo: '28 cu ft'
    }
  },
  { 
    id: 27, 
    name: 'Chevrolet Tahoe', 
    price: 270, 
    description: 'Full-size SUV with massive interior space.', 
    image: '/sports-car-4826752_1280.jpg',
    features: [
      '5.3L EcoTec3 V8 (355 HP)',
      'Magnetic Ride Control',
      '10.2-inch touchscreen',
      'Bose premium audio',
      'Power-folding third row',
      'HD Surround Vision',
      'Adaptive cruise control',
      'Power-retractable running boards',
      'Rear seat reminder',
      'Teen Driver technology'
    ],
    specs: {
      engine: '5.3L V8 (355 HP)',
      mileage: '16 city / 20 highway mpg',
      year: 2023,
      transmission: '10-speed automatic',
      seats: 8,
      drivetrain: '4WD',
      fuel: 'Regular unleaded',
      cargo: '25.5 cu ft'
    }
  },
  { 
    id: 28, 
    name: 'BMW 3 Series', 
    price: 310, 
    description: 'Sporty luxury sedan with precise handling.', 
    image: '/car-7227552_1280.jpg',
    features: [
      '2.0L TwinPower Turbo engine',
      'M Sport suspension',
      'Live Cockpit Professional',
      'Harman Kardon surround sound',
      'Vernasca leather upholstery',
      'Gesture control',
      'Head-up display',
      'Active Driving Assistant',
      'Ambient lighting',
      'Wireless charging'
    ],
    specs: {
      engine: '2.0L Turbo I4 (255 HP)',
      mileage: '26 city / 36 highway mpg',
      year: 2023,
      transmission: '8-speed automatic',
      seats: 5,
      drivetrain: 'RWD',
      fuel: 'Premium unleaded',
      cargo: '17 cu ft'
    }
  },
  { 
    id: 29, 
    name: 'Mercedes-Benz GLE', 
    price: 390, 
    description: 'Mid-size luxury SUV with cutting-edge tech.', 
    image: '/mercedes-benz-1036358_1280.jpg',
    features: [
      'MBUX infotainment system',
      'ENERGIZING comfort control',
      'Burmester surround sound',
      'Active Parking Assist',
      'Air suspension system',
      'Multicolor ambient lighting',
      'Augmented video for navigation',
      'Heated/ventilated front seats',
      'Wireless charging',
      'Trailer hitch'
    ],
    specs: {
      engine: '3.0L Turbo I6 (362 HP)',
      mileage: '19 city / 26 highway mpg',
      year: 2023,
      transmission: '9-speed automatic',
      seats: 5,
      drivetrain: 'AWD',
      fuel: 'Premium unleaded',
      cargo: '33.3 cu ft'
    }
  },
  { 
    id: 30, 
    name: 'Toyota Tacoma', 
    price: 220, 
    description: 'Midsize pickup truck built for adventure.', 
    image: '/car-8446529_1280.jpg',
    features: [
      '3.5L V6 engine (278 HP)',
      'Multi-Terrain Select',
      'Crawl Control',
      'Apple CarPlay/Android Auto',
      'Qi-compatible wireless charging',
      'Power sliding rear window',
      'Towing package',
      'Locking rear differential',
      'Bed utility system',
      'LED headlights'
    ],
    specs: {
      engine: '3.5L V6 (278 HP)',
      mileage: '19 city / 24 highway mpg',
      year: 2023,
      transmission: '6-speed automatic',
      seats: 5,
      drivetrain: '4WD',
      fuel: 'Regular unleaded',
      cargo: '1,440 lbs payload'
    }
  },
  { 
    id: 31, 
    name: 'Honda Civic Type R', 
    price: 240, 
    description: 'Hot hatch with track-ready performance.', 
    image: '/honda-4384888_1280.jpg',
    features: [
      '2.0L VTEC Turbo engine (315 HP)',
      '6-speed manual transmission',
      'Adaptive suspension system',
      'Brembo performance brakes',
      'Alcantara-wrapped steering wheel',
      '12-speaker Bose audio',
      'Dual-zone climate control',
      'Honda Sensing safety suite',
      'Three-mode drive system',
      '20-inch alloy wheels'
    ],
    specs: {
      engine: '2.0L Turbo I4 (315 HP)',
      mileage: '22 city / 28 highway mpg',
      year: 2023,
      transmission: '6-speed manual',
      seats: 5,
      drivetrain: 'FWD',
      fuel: 'Premium unleaded',
      cargo: '25.7 cu ft'
    }
  },
  { 
    id: 32, 
    name: 'Porsche Taycan', 
    price: 420, 
    description: 'Electric sports sedan with blistering speed.', 
    image: '/porsche-boxter-4032307_1280.jpg',
    features: [
      'Performance Battery Plus (93.4 kWh)',
      '800-volt architecture',
      'Porsche Torque Vectoring Plus',
      '16.8-inch curved display',
      'Burmester 3D sound system',
      'Porsche Active Aerodynamics',
      'Adaptive air suspension',
      'Porsche Ceramic Composite Brakes',
      '4D Chassis Control',
      'Heat pump for efficiency'
    ],
    specs: {
      engine: 'Dual-motor electric',
      mileage: '79 MPGe combined',
      year: 2023,
      transmission: '2-speed automatic',
      seats: 4,
      drivetrain: 'AWD',
      fuel: 'Electric',
      cargo: '14.3 cu ft'
    }
  },
  { 
    id: 33, 
    name: 'Subaru WRX STI', 
    price: 260, 
    description: 'Rally-bred sports sedan with all-wheel drive.', 
    image: '/subaru-1204883_1280.jpg',
    features: [
      '2.5L turbocharged Boxer engine',
      'Symmetrical full-time AWD',
      'Recaro performance seats',
      'Brembo performance brakes',
      'STI-tuned sport suspension',
      'Driver Focus distraction mitigation',
      'SI-Drive performance management',
      'Multi-mode Vehicle Dynamics Control',
      'Short-throw shifter',
      'Dual-mode exhaust system'
    ],
    specs: {
      engine: '2.5L Turbo H4 (310 HP)',
      mileage: '18 city / 24 highway mpg',
      year: 2023,
      transmission: '6-speed manual',
      seats: 5,
      drivetrain: 'AWD',
      fuel: 'Premium unleaded',
      cargo: '12 cu ft'
    }
  }
];

const page = ()  =>{
  const  params = useParams();
  const carsId = parseInt(params.id) 
  const cars =  carsData.find(cars => cars.id === carsId)
  const router = useRouter();
  const [showModal, setShowModal] = useState();
  const [bookingsDates, setBookingDates] = useState({
    startDate: '',
    endDate: ''
  }); 
const handleBooking = () =>{
   setShowModal(true);
}

const confirmBooking = () =>{
  const bookings = JSON.parse (localStorage.getItem('bookings') || '[]');
  const newBooking = {
    carsId: cars.id,
    carName: cars.name,
    price: cars.price,
    image: cars.image,
    startDate: bookingsDates.startDate,
    endDate: bookingsDates.endDate,
    bookedAt: new Date().toISOString()
  }
  bookings.push (newBooking);
  localStorage.setItem('bookings', JSON.stringify(bookings))

  setShowModal(false);
  router.push('/bookings')
}
  if (!cars) {
    return (
      <div>
        <Nav />
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold">Car not found</h1>
          <Link href="/" className="text-[#646ae8] font-semibold mt-4 inline-block">
            ← Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Nav />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
  <div className="flex flex-col lg:flex-row gap-6 xl:gap-8">
    {/* Car Image */}
    <div className="w-full lg:w-1/2">
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
        <Image
          src={cars.image}
          alt={cars.name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>

    {/* Car Details */}
    <div className="w-full lg:w-1/2 space-y-6">
      <div className="bg-white p-4 sm:p-6 border-2 border-gray-100 rounded-xl shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{cars.name}</h1>
        <hr className="my-3 border-gray-200" />
        <p className="text-gray-600 text-base sm:text-lg">{cars.description}</p>
        <hr className="my-3 border-gray-200" />
        <p className="text-[#646ae8] font-semibold text-xl sm:text-2xl">
          ${cars.price}/day
        </p>
      </div>

      {/* Features Section */}
      <div className="bg-white p-4 sm:p-6 border-2 border-gray-100 rounded-xl shadow-sm">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
          Key Features
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cars.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-[#646ae8] mr-2 mt-0.5">✓</span>
              <span className="text-gray-600 text-sm sm:text-base">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Specifications Section */}
      <div className="bg-white p-4 sm:p-6 border-2 border-gray-100 rounded-xl shadow-sm">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
          Specifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Engine</p>
            <p className="font-medium text-gray-700">{cars.specs.engine}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Mileage</p>
            <p className="font-medium text-gray-700">{cars.specs.mileage}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Transmission</p>
            <p className="font-medium text-gray-700">{cars.specs.transmission}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Year</p>
            <p className="font-medium text-gray-700">{cars.specs.year}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Seats</p>
            <p className="font-medium text-gray-700">{cars.specs.seats}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Drivetrain</p>
            <p className="font-medium text-gray-700">{cars.specs.drivetrain}</p>
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <button
        onClick={handleBooking}
        className="w-full bg-[#646ae8] hover:bg-[#4a50c5] text-white font-semibold py-3 px-4 rounded-lg transition duration-200 text-lg"
      >
        Book Now
      </button>
    </div>
  </div>

  {/* Booking Modal */}
  {showModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Confirm Booking</h2>
        <p className="mb-6 text-gray-700">
          You're about to book: <strong className="text-[#646ae8]">{cars.name}</strong>
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Start Date
            </label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#646ae8] focus:border-[#646ae8]"
              value={bookingsDates.startDate}
              onChange={(e) => setBookingDates({...bookingsDates, startDate: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              End Date
            </label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#646ae8] focus:border-[#646ae8]"
              value={bookingsDates.endDate}
              onChange={(e) => setBookingDates({...bookingsDates, endDate: e.target.value})}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={confirmBooking}
            className="px-4 py-2 bg-[#646ae8] text-white rounded-lg hover:bg-[#4a50c5] transition disabled:opacity-50"
            disabled={!bookingsDates.startDate || !bookingsDates.endDate}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  )}
</div>
     </div>
  )
}

export default page;