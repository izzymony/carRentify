'use client'
import Image from "next/image";
import Nav from "./components/Nav";
import Link from "next/link";
import { useState, useMemo } from "react";

const carsData = [
  { id: 1, name: 'Toyota Camry', price: 50, description: 'A reliable sedan for your travels.', image: '/pexels-harem-1617688755-28688908.jpg' },
  { id: 2, name: 'Honda Accord', price: 55, description: 'Comfortable and spacious for long trips.', image: '/pexels-vadutskevich-16350076.jpg' },
  { id: 3, name: 'Ford Mustang', price: 70, description: 'A sporty car for an exciting drive.', image: '/pexels-avinashpatel-544542 (1).jpg' },
  { id: 4, name: 'Tesla Model 3', price: 80, description: 'An electric car with advanced features.', image: '/pexels-zion-10029873.jpg' },
  { id: 5, name: 'Audi Q5', price: 300, description: 'Luxury compact SUV with premium interior and technology.', image: '/pexels-brandon-martinez-991996542-20220997.jpg' },
  { id: 6, name: 'Hyundai Ioniq5', price: 3000, description: 'Futuristic electric crossover with fast charging.', image: '/car-2358976_1280.jpg' }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCars = useMemo(() => {
    if (!searchTerm) return carsData;
    return carsData.filter(car =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
      <div className="">
        <Nav />
        <div>
          <header className="relative">
            <Image 
              src={'/pexels-pixabay-164634 (1).jpg'} 
              alt="" 
              width={300} 
              height={50} 
              className="w-full object-cover h-[300px] md:h-[400px]" 
            />
            <div className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4">
              <h1 className="font-bold text-center text-[24px] md:text-[30px]">Find Your Perfect Ride</h1>
              <p className="text-center font-semibold text-[12px] md:text-[14px]">Discover and book cars effortlessly for any journey, anywhere.</p>
              <div className="mt-4 px-3 gap-2 flex flex-col md:flex-row justify-center items-center max-w-2xl mx-auto">
                <input
                  type="text"
                  className="opacity-50 text-[#646ae8] p-1 rounded-[10px] w-full p-3"
                  placeholder="Search for cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => { if(e.key === 'Enter') e.preventDefault(); }}
                />
                <button
                  type="button"
                  onClick={() => {}}
                  className="w-full md:w-auto rounded-[10px] flex justify-center mt-3 md:mt-0 p-3 bg-[#646ae8]"
                >
                  <div>
                    <Image src={'/icons8-search-50.png'} alt='' width={16} height={16} className='opacity-70 mt-1' />
                  </div>
                  <p className="font-medium text-white ml-2">Search</p>
                </button>
              </div>
            </div>
          </header>
  
          <section className="pt-14 md:pt-20 grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            <div className="col-span-1 md:col-span-3">
              <h1 className="text-[24px] md:text-[30px] text-black text-center font-bold">Why Choose Us</h1>
            </div>
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white justify-center align-center text-center border-grey-100 border-2 p-4 rounded-lg">
                <Image 
                  className="mx-auto" 
                  src={item === 1 ? '/icons8-car-24.png' : item === 2 ? '/icons8-time-50 (1).png' : '/icons8-dollar-sign-24.png'} 
                  width={30} 
                  height={30} 
                />
                <h1 className="font-semibold text-[18px] md:text-[20px] text-black">
                  {item === 1 ? 'Wide Selection' : item === 2 ? 'Easy Booking' : 'Best Prices'}
                </h1>
                <p className="font-medium text-[#aaaba9] py-2">
                  {item === 1 ? 'Choose from a diverse fleet of vehicles to match needs and style.' : 
                   item === 2 ? 'Rent a car in just a few simple steps with our streamlined' : 
                   'Get competitive rates and transparent pricing no hidden fees'}
                </p>
              </div>
            ))}
          </section>
  
          <div className="p-6 mt-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.length === 0 ? (
              <p className="text-center text-gray-600 col-span-full">No cars found matching your search.</p>
            ) : (
              filteredCars.map(car => (
              <div key={car.id} className="border-grey-300 border rounded-lg shadow-lg  bg-white flex flex-col hover:shadow-xl transition-shadow duration-200">
                                  <div className="relative w-full aspect-[4/3] mb-4 rounded overflow-hidden"> {/* Changed to aspect ratio */}
                                    <Image
                                      src={car.image}
                                      alt={car.name}
                                      fill
                                      style={{objectFit: 'cover'}}
                                      className="rounded"
                                      priority={car.id <= 4} // Optional: prioritize loading first few images
                                    />
                                  </div>
                                  <div className="px-4 flex-grow">
                                    <h2 className="text-xl text-black font-bold">{car.name}</h2>
                                    <p className="font-bold text-[21px] text-[#646ae8]"> ${car.price} /day</p>
                                    <p className="text-gray-600 mt-2 mb-4">{car.description}</p>
                                  </div>
                                  <div className="px-4 pb-4">
                                    <Link href={`/car/${car.id}`} className="float-right">
                                      <p className="inline-block border-[#646ae8] border-2 bg-white font-semibold rounded px-4 py-2 text-center text-[#646ae8] hover:bg-[#646ae8] hover:text-white transition-colors duration-200">
                                        View Car Details
                                      </p>
                                    </Link>
                                  </div>
                                </div>
              ))
            )}
          </div>
  
          <Link href={'/Cars-page'}>
            <p className="px-4 font-semibold text-[#646ae8]">See more...</p>
          </Link>
  
          <section className="py-8 px-4 md:px-8">
            <h1 className="text-[24px] md:text-[30px] text-black text-center font-bold">How it works</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="bg-white border-grey-100 border-2 p-4 rounded-lg">
                  <div className="bg-[#646ae8] align-center mx-auto text-center w-10 h-10 text-white p-2 rounded-full">
                    <p className="text-center font-bold">{step}</p>
                  </div>
                  <div className='mx-auto text-center'>
                    <Image 
                      src={step === 1 ? '/icons8-search-50 (1).png' : 
                           step === 2 ? '/icons8-booked-32.png' : '/icons8-move-50.png'} 
                      width={30} 
                      height={30} 
                      alt="" 
                      className="mx-auto mt-4" 
                    />
                    <h1 className="text-[18px] md:text-[20px] font-semibold text-black">
                      {step === 1 ? 'Find Your Car' : 
                       step === 2 ? 'Book & Pay' : 'Pick Up & Drive'}
                    </h1>
                    <p className="font-medium text-[#aaaba9] py-2">
                      {step === 1 ? 'Browse our collections or search by location, data and car type' : 
                       step === 2 ? 'Select your desired car, enter your details, and complete the payment' : 
                       'Collect your Keys at the designated location and enjoy your ride!'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
  
          <article className='px-4 md:px-8 w-full max-w-4xl mx-auto'>
            <div>
              <h1 className="text-[24px] md:text-[30px] text-black text-center font-bold">What Our Customers Say</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                { name: 'Austin Timberlake', image: '/pexels-olly-837358.jpg', comment: '"CarRentify made booking car for my vacation incredibly easy. Great service and fantastic car option"' },
                { name: 'Sam Alladice', image: '/pexels-blitzboy-1040881.jpg', comment: '"Competitive prices and quick pick-up. Will definitely use them again for my business trip."' },
                { name: 'Emily Sammons', image: '/pexels-emilygarland-1499327.jpg', comment: '"The app so intuitive! Found the perfect car for my family road trip within minutes"' }
              ].map((customer, index) => (
                <div key={index} className="bg-white p-4 border-grey-100 border-2 rounded-lg">
                  <div className="flex gap-4">
                    <Image src={customer.image} alt="" width={60} height={60} className="object-cover rounded-full h-10 w-10" />
                    <div>
                      <p className="font-semibold text-[16px] md:text-[18px] text-black">{customer.name}</p>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Image key={i} src={'/icons8-star-50 (1).png'} alt="" width={16} height={16} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="font-medium text-[#aaaba9] py-2 italic">{customer.comment}</p>
                </div>
              ))}
            </div>
          </article>
  
          <section className="px-4 md:px-8">
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              {[...Array(10)].map((_, i) => (
                <Image key={i} src={`/Selection${i > 0 ? ` (${i})` : ''}.png`} alt="" width={80} height={80} className="w-16 h-16 md:w-20 md:h-20" />
              ))}
            </div>
          </section>
  
          <hr className="mt-16" />
          
          <footer className="px-4 md:px-8 pb-8">
            <h1 className="font-semibold text-center text-black text-[18px] md:text-[20px] mt-5">CarRentify</h1>
            <p className="text-black text-center font-medium mt-3">Stay updated with our latest offers</p>
            <div className="flex flex-col md:flex-row gap-4 mt-4 max-w-md mx-auto">
              <input 
                type="text" 
                placeholder="Your email" 
                className="p-3 rounded-[12px] bg-white border-2 border-[#aaaba9] text-grey-700 flex-grow" 
              />
              <button className="bg-[#646ae8] rounded-[12px] p-2 px-6 text-white">Subscribe</button>
            </div>
          </footer>
        </div>
      </div>
    );
  }
  
    