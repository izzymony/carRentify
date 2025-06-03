'use client'
import React, {useState} from 'react'
import Nav from '@/app/components/Nav';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';


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
 const params = useParams();
 const carsId = parseInt(params.id);
 const cars = carsData.find(cars => cars.id === carsId )  
 const router = useRouter();
 const [showModal, setShowModal] = useState();
 const [bookingsDates, setBookingDates] = useState({
      startDate: '',
    endDate: ''         
 })  
 
 const handleBooking = () => {
              setShowModal(true);

 }

 const confirmBooking = () => {
     const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
     const newBooking = {
         carsId: cars.id,
         carsName: cars.name  ,        
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

 if(!cars){
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
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <div className='flex flex-col md:flex-row gap-8'>
             <div>
               <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
                              <Image src={cars.image}
                                alt={cars.name}
                                fill
              
                                className='object-cover'
                                priority
                              />
                          </div>
                        <div className=' mt-2 bg-white p-3 border-2 border-grey-100 rounded-[10px] md:w-1/2'>
              <h1 className='text-3xl font-bold text-black  text-gray'>{cars.name}</h1>

                 <hr className='mt-2'/>

                  <h2 className='text-black font-bold text-[20px] mt-2'>{cars.title}</h2>        
                 <p className='mt-2 text-[#aaaba9] '>{cars.description}</p>
                  <hr className='mt-2'/>
              <p className='text-[#646ae8] font-semibold mt-2 text-[20px]'>${cars.price}/day</p>


         </div>

         {showModal && (
              <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                  <div className='bg-white p-6 rounded-lg max-w-md w-full'>
                      <h2 className='text-2xl font-bold mb-4 text-black '>Confirm Booking</h2>
                      <p className='mb-4 text-black'> You're about to book: <strong>{cars.name}</strong></p>

                    <div className="mb-4">
                <label className="block mb-2 text-black">Start Date</label>
                <input 
                  type="date" 
                  className="w-full text-[#aaaba9] text-[12px] p-2 border rounded"
                  value={bookingsDates.startDate}
                  onChange={(e) => setBookingDates({...bookingsDates, startDate: e.target.value})}
                />
              </div>
                    <div className="mb-4">
                <label className="block mb-2 text-black"> End Date</label>
                <input 
                  type="date" 
                  className="w-full text-[#aaaba9] text-[12px] p-2 border rounded"
                  value={bookingsDates.endDate}
                  onChange={(e) => setBookingDates({...bookingsDates, endDate: e.target.value})}
                />
               
                
              </div>
                    <div className='flex  justify-end gap-2'>
                          <button className='px-4 py-2 border rounded' 
                          onClick={() => showModal (false)}
                         
                          >
                              Cancel
                          </button>
                           <button 
                  onClick={confirmBooking}
                  className="px-4 py-2 bg-[#646ae8] text-white rounded"
                  disabled={!bookingsDates.startDate || !bookingsDates.endDate}
                >
                  Confirm
                </button>
                    </div>
                  </div>
              </div>
            )}   
              </div>               
        </div>
         <button onClick={handleBooking} className='mt-4 w-full bg-[#646ae8] hover:bg-[#4a50c5] text-white font-bold py-3 px-4 rounded-lg transition duration-200'>
          Book Now</button>            
      </div>
    </div>
  )
}

export default page
