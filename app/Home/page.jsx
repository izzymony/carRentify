'use client'
import Image from "next/image";
import Nav from '@/app/components/Nav'
import Link from "next/link";
import { useState, useMemo } from "react";

const carsData = [
  { id: 1 , name: 'Toyota Camry', price: 50, description: 'A reliable sedan for your travels.', image: '/pexels-harem-1617688755-28688908.jpg' },
  { id: 2, name: 'Honda Accord', price: 55, description: 'Comfortable and spacious for long trips.', image: '/pexels-vadutskevich-16350076.jpg' },
  { id: 3, name: 'Ford Mustang', price: 70, description: 'A sporty car for an exciting drive.', image: '/pexels-avinashpatel-544542 (1).jpg' },
  { id: 4, name: 'Tesla Model 3', price: 80, description: 'An electric car with advanced features.', image: '/pexels-zion-10029873.jpg' },
  {id: 5,  name:'Audi Q5', price: 3000, description:'', image: '/pexels-brandon-martinez-991996542-20220997.jpg'},
  {id: 5,  name:'Range rover', price: 3000, description:'', image: '/pexels-brandon-martinez-991996542-20220997.jpg'},
  {id: 6,  name:'Audi Q5', price: 3000, description:'', image: '/pexels-brandon-martinez-991996542-20220997.jpg'}
];

const page =() => {
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
      <div>
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

          
      <section className="pt-64 grid grid-cols-1 gap-3 md:grid-cols-3 gap-4 p-6">
    <div className="col-span-1 md:col-span-3">
      <h1 className="text-[30px] text-black text-center font-bold">Why Choose Us</h1>
    </div>
        <div className="  bg-white justify-center align-center  text-center border-grey-100 border-2 p-4 rounded-lg">
          <Image className=" mx-auto" src={'/icons8-car-24.png'} width={30} height={30} />
          <h1 className="font-semibold text-[20px] text-black f  ">Wide Selection</h1>
          <p className="font-medium text-[#aaaba9] py-2">Choose from a diverse fleet of vehicles to match needs and style.</p>
        </div>
        <div className=" bg-white justify-center align-center   text-center border-grey-100 border-2 p-4 rounded-lg">
          <Image className="mx-auto" src={'/icons8-time-50 (1).png'} width={30} height={30} />
          <h1 className="font-semibold font-[25px] text-[20px] text-black  ">Easy Booking</h1>
          <p className="font-medium text-[#aaaba9] py-2">Rent a car in just a few simple steps with our streamlined</p>
        </div>
        <div className=" bg-white justify-center align-center  text-center p-4 border-grey-100 border-2 rounded-lg">
          <Image className="mx-auto" src={'/icons8-dollar-sign-24.png'} width={30} height={30} />
          <h1 className="font-semibold font-[25px] text-[20px] text-black  ">Best Prices</h1>
          <p className="font-medium text-[#aaaba9] py-2">Get competitive rates and transparent pricing no hidden fees</p>
        </div>
      </section>

      <div className="p-6 mt-1 grid grid-cols-1 ">
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

      <section className=" py-8 px-4">
          <h1 className="text-[30px] text-black text-center font-bold">How it works</h1>
        <div className="bg-white borer-grey-100 border-2 p-4 rounded-lg  mt-6">
          <div className="bg-[#646ae8] align-center mx-auto text-center  w-10 h-10   text-white p-2  rounded-full ">
            <p className=" text-center font-bold ">1</p>
           
          </div>
          <div className='mx-auto text-center'>
           <Image  src={'/icons8-search-50 (1).png'} width={30} height={30} alt=""  className="mx-auto mt-4" />
            <h1 className="text-[20px] font-semibold text-black">Find Your Car</h1>
            <p className=" font-medium text-[#aaaba9] py-2">Browse our collections or search by location, data and car type</p>
            </div>
        </div>


        <div className="bg-white borer-grey-100 border-2 p-4 rounded-lg  mt-6">
          <div className="bg-[#646ae8] align-center mx-auto text-center  w-10 h-10   text-white p-2  rounded-full ">
            <p className=" text-center font-bold ">2</p>
           
          </div>
          <div className='mx-auto text-center'>
           <Image  src={'/icons8-booked-32.png'} width={30} height={30} alt=""  className="mx-auto mt-4" />
            <h1 className="text-[20px] font-semibold text-black">Book & Pay</h1>
            <p className=" font-medium text-[#aaaba9] py-2">Select your desired car, enter your details, and complete the payment</p>
            </div>
        </div>

        <div className="bg-white borer-grey-100 border-2 p-4 rounded-lg  mt-6">
          <div className="bg-[#646ae8] align-center mx-auto text-center  w-10 h-10   text-white p-2  rounded-full ">
            <p className=" text-center font-bold ">3</p>
           
          </div>
          <div className='mx-auto text-center'>
            
           <Image  src={'/icons8-move-50.png'} width={30} height={30} alt=""  className="mx-auto mt-4" /> 
            <h1 className="text-[20px] font-semibold text-black">Pick Up & Drive</h1>
            <p className=" font-medium text-[#aaaba9] py-2">Collect your Keys at the designated location and enjoy your ride!</p>
            </div>
        </div>


      </section>

      <article className='px-4 w-fit mx-auto'>
        <div>
           <h1 className="text-[30px] text-black text-center font-bold">What Our Customers Say</h1>
        </div>
        <div className="bg-white p-4 border-grey-100 border-2 rounded-lg mt-8">
          <div className="flex gap-4">
            <Image src={'/pexels-olly-837358.jpg'} alt="" width={60} height={60} className="object-cover rounded-full h-10 w-10"  />
            <div>
              <p className="font-semibold text-[18px] text-black">Austin Timberlake</p>
              
              <div className="flex mt-1">
                <Image src={'/icons8-star-50 (1).png'} alt="" width={16} height={16} />
                <Image src={'/icons8-star-50 (1).png'} alt="" width={16} height={16} />
                <Image src={'/icons8-star-50 (1).png'} alt="" width={16} height={16} />
                <Image src={'/icons8-star-50 (1).png'} alt="" width={16} height={16} />
                <Image src={'/icons8-star-50 (1).png'} alt="" width={16} height={16} />
              </div>
            </div>
          </div>
           <p className=" font-medium text-[#aaaba9] py-2 italic">"CarRentify made booking car for my vacation incredibly easy. Great service and fantastic car option"</p>
        </div>
        <div className="bg-white p-4 border-grey-100 border-2 rounded-lg mt-8">
          <div className="flex gap-4">
            <Image src={'/pexels-blitzboy-1040881.jpg'} alt="" width={60} height={60} className="object-cover rounded-full h-10 w-10"  />
            <div>
              <p className="font-semibold text-[18px] text-black">Sam Alladice</p>
              
              <div className="flex  mt-1">
                <Image src={'/icons8-star-50 (1).png'} alt="" width={16} height={16} />
                <Image src={'/icons8-star-50 (1).png'} alt="" width={16} height={16} />
                <Image src={'/icons8-star-50 (1).png'} alt="" width={16} height={16} />
                <Image src={'/icons8-star-50 (1).png'} alt="" width={16} height={16} />
                <Image src={'/icons8-star-50 (1).png'} alt="" width={16} height={16} />
              </div>
            </div>
          </div>
           <p className=" font-medium text-[#aaaba9] py-2 italic">"Competitive prices and quick pick-up. Will definitely use them again for my business trip."</p>
        </div>

        <div className="bg-white p-4 border-grey-100 border-2 rounded-lg mt-8">
          <div className="flex gap-4">
            <Image src={'/pexels-emilygarland-1499327.jpg'} alt="" width={60} height={60} className="object-cover rounded-full h-10 w-10"  />
            <div>
              <p className="font-semibold text-[18px] text-black">Emily Sammons</p>
              
              <div className="flex mt-1">
                <Image src={'/icons8-star-50 (1).png'} alt="" width={16} height={16} />
                <Image src={'/icons8-star-50 (1).png'} alt="" width={16} height={16} />
                <Image src={'/icons8-star-50 (1).png'} alt="" width={16} height={16} />
                <Image src={'/icons8-star-50 (1).png'} alt="" width={16} height={16} />
                <Image src={'/icons8-star-50 (1).png'} alt="" width={16} height={16} />
              </div>
            </div>
          </div>
           <p className=" font-medium text-[#aaaba9] py-2 italic">"The app so intuitive! Found the perfect car for my family road trip within minutes"</p>
        </div>
      
      </article>

      <section className="px-4">
        <div className="flex items-center justify-center gap-4 mt-8">
          <Image src={'/Selection.png'} alt="" width={80} height={80}  />
          <Image src={'/Selection (1).png'} alt="" width={80} height={80}  />
          <Image src={'/Selection (2).png'} alt="" width={80} height={80}  />
          <Image src={'/Selection (3).png'} alt="" width={80} height={80}  />
          <Image src={'/Selection (4).png'} alt="" width={80} height={80}  />
        </div>

        <div className="flex items-center justify-center gap-4">
          <Image src={'/Selection (5).png'} alt="" width={80} height={80}  />
          <Image src={'/Selection (6).png'} alt="" width={80} height={80}  />
          <Image src={'/Selection (7).png'} alt="" width={80} height={80}  />
          <Image src={'/Selection (8).png'} alt="" width={80} height={80}  />
          <Image src={'/Selection (9).png'} alt="" width={80} height={80}  />
        </div>
      </section>
      <hr className="mt-16" />
      <footer>
        <h1 className="font-semibold text-center text-black text-[20px] mt-5">CarRentify</h1>
        <p className=" text-black text-center font-medium mt-3"> Stay updated with our latest offers</p>
      <div className="flex flex-col  mt-4 px-4 ">
        <input type="text"  placeholder="" className="p-3 text-[#aaaba9]  rounded-[12px] bg-white border-2 border-[#aaaba9]   rounded-10px" />

        <label htmlFor="">

        </label>
        <button className="bg-[#646ae8] mt-4 rounded-[12px] p-2">Subscribe</button>
        </div>
      </footer>
    </div>
    </div>
  );
}

export default page;