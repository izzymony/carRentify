'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '../../components/Nav'
import React,{useState} from 'react'
import { useRouter } from 'next/navigation'
import Cars from '../../components/Cars'

const carsData = [
  { 
    id: 1, 
    name: 'Toyota Camry', 
    price: 50,
    title : 'Description',
    description: 'A reliable sedan for your travels.', 
    image: '/pexels-harem-1617688755-28688908.jpg',
    features: ['Automatic transmission', '5 seats', 'Bluetooth', 'Air conditioning'],
    specs: {
      engine: '2.5L 4-cylinder',
      mileage: '28 city / 39 highway',
      year: '2023'
    }
  },
  { 
    id: 2, 
    name: 'Honda Accord',
    title : 'Description', 
    price: 55, 
    description: 'The Honda Accord is a midsize sedan known for its reliability, spacious interior, and fuel efficiency. It offers a comfortable ride with a well-designed cabin that features modern technology and safety features.', 
    image: '/pexels-vadutskevich-16350076.jpg',
    features: ['Sunroof', 'Leather seats', 'Backup camera', 'Apple CarPlay'],
    specs: {
      engine: '1.5L Turbo 4-cylinder',
      mileage: '30 city / 38 highway',
      year: '2022'
    }
  },

  
 
];

const page = ()  =>{
  const  params = useParams();
  const carId = parseInt(params.id) 
  const car =  carsData.find(car => car.id === carId)
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
    carId: car.id,
    carName: car.name,
    price: car.price,
    image: car.image,
    startDate: bookingsDates.startDate,
    endDate: bookingsDates.endDate,
    bookedAt: new Date().toISOString()
  }
  bookings.push (newBooking);
  localStorage.setItem('bookings', JSON.stringify(bookings))

  setShowModal(false);
  router.push('/bookings')
}
  if (!car) {
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
          {/* */}
         <div >
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
                <Image src={car.image}
                  alt={car.name}
                  fill

                  className='object-cover'
                  priority
                />
            </div>
         </div>

         <div className=' mt-2 bg-white p-3 border-2 border-grey-100 rounded-[10px] md:w-1/2'>
              <h1 className='text-3xl font-bold text-black  text-gray'>{car.name}</h1>

                 <hr className='mt-2'/>

                  <h2 className='text-black font-bold text-[20px] mt-2'>{car.title}</h2>        
                 <p className='mt-2 text-[#aaaba9] '>{car.description}</p>
                  <hr className='mt-2'/>
              <p className='text-[#646ae8] font-semibold mt-2 text-[20px]'>${car.price}/day</p>


         </div>
            {showModal && (
              <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                  <div className='bg-white p-6 rounded-lg max-w-md w-full'>
                      <h2 className='text-2xl font-bold mb-4 text-black '>Confirm Booking</h2>
                      <p className='mb-4 text-black'> You're about to book: <strong>{car.name}</strong></p>

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
          <div className="mb-8 border-2 border-grey-100 rounded-[10px] p-2 mt-4">
              <h2 className="text-xl font-semibold mb-3 text-black">Key Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {car.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-[#aaaba9]">
                    <span className="text-[#646ae8] mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
                        <div className="mb-8 border  border-2 border-grey-100 rounded-[10px] p-2">
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Engine</p>
                  <p className="font-medium text-[#aaaba9]">{car.specs.engine}</p>
                </div>
                <div>
                  <p className="text-gray-600">Mileage</p>
                  <p className="font-medium text-[#aaaba9]">{car.specs.mileage}</p>
                </div>
              
                <div>
                  <p className="text-gray-600">Year</p>
                  <p className="font-medium text-[#aaaba9]">{car.specs.year}</p>
                </div>
              </div>
            </div>
                
        </div>
        <button onClick={handleBooking} className='mt-4 w-full bg-[#646ae8] hover:bg-[#4a50c5] text-white font-bold py-3 px-4 rounded-lg transition duration-200'>
          Book Now</button> 
      </div>
    </div>
  )
}

export default page;