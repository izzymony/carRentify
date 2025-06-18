'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '../../components/Nav'
import React,{useState} from 'react'
import { useRouter } from 'next/navigation'


const carsData = [
  { 
    id: 1, 
    name: 'Toyota Camry', 
    price: 50,
    title: 'Description',
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
    title: 'Description', 
    price: 55, 
    description: 'Comfortable and spacious for long trips.', 
    image: '/pexels-vadutskevich-16350076.jpg',
    features: ['Sunroof', 'Leather seats', 'Backup camera', 'Apple CarPlay'],
    specs: {
      engine: '1.5L Turbo 4-cylinder',
      mileage: '30 city / 38 highway',
      year: '2022'
    }
  },
  { 
    id: 3, 
    name: 'Ford Mustang',
    title: 'Description', 
    price: 70, 
    description: 'A sporty car for an exciting drive.', 
    image: '/pexels-avinashpatel-544542 (1).jpg',
    features: ['V8 Engine', '2 seats', 'Sport mode', 'Premium sound system'],
    specs: {
      engine: '5.0L V8',
      mileage: '15 city / 24 highway',
      year: '2023'
    }
  },
  { 
    id: 4, 
    name: 'Tesla Model 3',
    title: 'Description', 
    price: 80, 
    description: 'An electric car with advanced features.', 
    image: '/pexels-zion-10029873.jpg',
    features: ['Electric', 'Autopilot', '15" Touchscreen', 'Over-the-air updates'],
    specs: {
      engine: 'Electric',
      mileage: '358 miles range',
      year: '2023'
    }
  },
  { 
    id: 5, 
    name: 'Audi Q5',
    title: 'Description', 
    price: 300, 
    description: 'Luxury compact SUV with premium interior and technology.', 
    image: '/pexels-brandon-martinez-991996542-20220997.jpg',
    features: ['Quattro AWD', 'Panoramic sunroof', 'Virtual cockpit', 'Premium leather'],
    specs: {
      engine: '2.0L Turbo 4-cylinder',
      mileage: '23 city / 29 highway',
      year: '2023'
    }
  },
  { 
    id: 6, 
    name: 'Hyundai Ioniq5',
    title: 'Description', 
    price: 3000, 
    description: 'Futuristic electric crossover with fast charging.', 
    image: '/car-2358976_1280.jpg',
    features: ['Ultra-fast charging', 'Solar roof', 'Augmented reality HUD', 'Vehicle-to-load'],
    specs: {
      engine: 'Electric',
      mileage: '303 miles range',
      year: '2023'
    }
  }
];

const page = ()  => {
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
       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 xl:gap-8">
          {/* Car Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={car.image}
                alt={car.name}
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{car.name}</h1>
              <hr className="my-3 border-gray-200" />
              <p className="text-gray-600 text-base sm:text-lg">{car.description}</p>
              <hr className="my-3 border-gray-200" />
              <p className="text-[#646ae8] font-semibold text-xl sm:text-2xl">
                ${car.price}/day
              </p>
            </div>
      
            {/* Features Section */}
            <div className="bg-white p-4 sm:p-6 border-2 border-gray-100 rounded-xl shadow-sm">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                Key Features
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {car.features.map((feature, index) => (
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
                  <p className="font-medium text-gray-700">{car.specs.engine}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Mileage</p>
                  <p className="font-medium text-gray-700">{car.specs.mileage}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Transmission</p>
                  <p className="font-medium text-gray-700">{car.specs.transmission}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Year</p>
                  <p className="font-medium text-gray-700">{car.specs.year}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Seats</p>
                  <p className="font-medium text-gray-700">{car.specs.seats}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Drivetrain</p>
                  <p className="font-medium text-gray-700">{car.specs.drivetrain}</p>
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
                You're about to book: <strong className="text-[#646ae8]">{car.name}</strong>
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