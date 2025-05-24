import React, { useState, useMemo } from 'react';

const carsData = [
  { id: 1, make: 'Toyota', model: 'Camry', year: 2018, price: 20000 },
  { id: 2, make: 'Honda', model: 'Accord', year: 2019, price: 22000 },
  { id: 3, make: 'Ford', model: 'Focus', year: 2017, price: 15000 },
  { id: 4, make: 'Tesla', model: 'Model 3', year: 2020, price: 35000 },
  { id: 5, make: 'Toyota', model: 'Corolla', year: 2016, price: 13000 },
  { id: 6, make: 'Honda', model: 'Civic', year: 2018, price: 18000 },
  { id: 7, make: 'Ford', model: 'Mustang', year: 2021, price: 45000 },
  { id: 8, make: 'Tesla', model: 'Model X', year: 2019, price: 80000 },
];

const uniqueMakes = [...new Set(carsData.map(car => car.make))];
const uniqueModels = [...new Set(carsData.map(car => car.model))];
const years = [...new Set(carsData.map(car => car.year))].sort((a, b) => a - b);

const CarSearchFilter =() => {
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    minYear: '',
    maxYear: '',
    minPrice: '',
    maxPrice: '',
  });

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  const filteredCars = useMemo(() => {
    return carsData.filter(car => {
      if (filters.make && car.make !== filters.make) return false;
      if (filters.model && car.model !== filters.model) return false;
      if (filters.minYear && car.year < parseInt(filters.minYear)) return false;
      if (filters.maxYear && car.year > parseInt(filters.maxYear)) return false;
      if (filters.minPrice && car.price < parseInt(filters.minPrice)) return false;
      if (filters.maxPrice && car.price > parseInt(filters.maxPrice)) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Car Search Filter</h2>
      
      <form className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label htmlFor="make" className="block font-semibold mb-1 text-gray-700">Make</label>
          <select
            id="make"
            name="make"
            value={filters.make}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            {uniqueMakes.map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="model" className="block font-semibold mb-1 text-gray-700">Model</label>
          <select
            id="model"
            name="model"
            value={filters.model}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!filters.make}
          >
            <option value="">All</option>
            {filters.make && uniqueModels
              .filter(model => carsData.some(car => car.make === filters.make && car.model === model))
              .map(model => (
                <option key={model} value={model}>{model}</option>
              ))
            }
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700">Year Range</label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="minYear"
              placeholder="Min Year"
              value={filters.minYear}
              onChange={handleFilterChange}
              className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={years[0]}
              max={years[years.length - 1]}
            />
            <input
              type="number"
              name="maxYear"
              placeholder="Max Year"
              value={filters.maxYear}
              onChange={handleFilterChange}
              className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={years[0]}
              max={years[years.length - 1]}
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700">Price Range ($)</label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={0}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={0}
            />
          </div>
        </div>
      </form>

      <div>
        {filteredCars.length === 0 ? (
          <p className="text-center text-gray-600">No cars found matching your criteria.</p>
        ) : (
          <ul className="space-y-4">
            {filteredCars.map(car => (
              <li key={car.id} className="p-4 border border-gray-200 rounded shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="text-xl font-semibold text-gray-900">{car.make} {car.model}</h3>
                <p className="text-gray-700">Year: {car.year}</p>
                <p className="text-gray-700">Price: ${car.price.toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

