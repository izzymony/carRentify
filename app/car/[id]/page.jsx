'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '../../components/Nav'

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
       <div className='flex flex-col md:flex-row gap-8"'>
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
                 <p className='mt-2 text-gray-400' >{car.description}</p>
                  <hr className='mt-2'/>
              <p className='text-[#646ae8] font-semibold mt-2 text-[20px]'>${car.price}/day</p>


         </div>
        </div> 
      </div>
    </div>
  )
}

export default page;