'use client'
import Image from "next/image";
import Nav from "./components/Nav";
import Link from "next/link";
import { useState, useMemo } from "react";

const carsData = [
  { id: 1, name: 'Toyota Camry', price: 50, description: 'A reliable sedan for your travels.', image: '/pexels-harem-1617688755-28688908.jpg' },
  { id: 2, name: 'Honda Accord', price: 55, description: 'Comfortable and spacious for long trips.', image: '/pexels-vadutskevich-16350076.jpg' },
  { id: 3, name: 'Ford Mustang', price: 70, description: 'A sporty car for an exciting drive.', image: '/cars/ford-mustang.jpg' },
  { id: 4, name: 'Tesla Model 3', price: 80, description: 'An electric car with advanced features.', image: '/cars/tesla-model3.jpg' },
  {id: 5,  name:'Audi Q5', price: 3000, description:''}
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
    <div>
      <Nav />
      <header>
        <Image src={'/pexels-pixabay-164634 (1).jpg'} alt="" width={300} height={50} className="w-full object-cover h-[400px]" />
        <div className="text-white relative -mt-64">
          <h1 className="font-bold text-center text-[30px]">Find Your Perfect Ride</h1>
          <p className="text-center font-semibold text-[14px]">Discover and book cars effortlessly for any journey, anywhere.</p>
          <div className="flex gap-2 justify-center align-center">
            <input
              type="text"
              className="opacity-50 text-[#646ae8] p-1 rounded-[10px] w-[250px]"
              placeholder="Search for cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter') e.preventDefault(); }} // prevent form submit on enter
            />
            <button
              type="button"
              onClick={() => {}}
              className="w-[100px] rounded-[10px] flex p-2 bg-[#646ae8]"
            >
              <div>
                <Image src={'/icons8-search-50.png'} alt='' width={16} height={16} className='opacity-70 mt-1' />
              </div>
              <p className="font-medium text-white">Search</p>
            </button>
          </div>
        </div>
      </header>

      <div className="p-6 mt-24 grid grid-cols-1 ">
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
          className="rounded w-ful" // Optional: to keep the corners rounded
          
        />
      </div>
      <div className="px-4">
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
    </div>
  );
}

