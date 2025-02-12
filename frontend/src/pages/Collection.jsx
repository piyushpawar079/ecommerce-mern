import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Filter, ProductList } from '../components'

const Collection = () => {

  const [filters, setFilters] = useState({ categories: [], types: [] });
  const [products, setProducts] = useState([]); // State to hold filtered products

  useEffect(() => {
    fetchFilteredProducts()
  }, [])

  const fetchFilteredProducts = async (filters) => {
    try {
      await axios.post('http://localhost:8000/api/v1/product/all-items', filters)
        .then((res) => {
          setProducts(res.data.msg || []); // Update the product list with fetched data
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
        console.error('Error fetching filtered products:', error);
    }
  };

  const handleFilterChange = (filterType, selectedFilters) => {
    const updatedFilters = { ...filters, [filterType]: selectedFilters };
    setFilters(updatedFilters);
    fetchFilteredProducts(updatedFilters); // Fetch filtered products
  };

  return (
    <div className='flex gap-10 my-8 ml-[10%]  '>
      <div className='w-[20%]'>
        <p className='text-black font-medium text-2xl '>FILTERS</p>
        <Filter
        title="CATEGORIES"
        options={['Men', 'Women', 'Kids']}
        onFilterChange={(selectedFilters) =>
          handleFilterChange('categories', selectedFilters)
        }
      />
      <Filter
        title="TYPES"
        options={['TopWear', 'BottomWear', 'WinterWear', 'SummerWear']}
        onFilterChange={(selectedFilters) =>
          handleFilterChange('types', selectedFilters)
        }
      />
      </div>
      <div className='w-full'>
        <div className='text-3xl font-semibold flex justify-between '>
          <div className='flex w-full '>
          <p className='text-slate-500'>All <span className='text-slate-700'>Collection</span> </p>
          <p className='w-[20%] h-[4px] bg-[#414141] mt-5 ml-4 '></p>
        </div>
        <div className='mr-[13%]'>
          <select className=' border border-gray-500 rounded-md text-sm  p-3 font-medium '>
            <option value="">Sort by: Relavent</option>
            <option value="">Sort by: Low to high</option>
            <option value="">Sort by: high to low</option>
          </select>

        </div>
        </div>
        <div>
          {products.length > 0 ? (
              <div className="flex gap-2 ">
                  {products.map((product) => (
                      <ProductList
                          key={product.name}
                          title={product.name}
                          image={product.images[0]} // Assuming images is an array
                          price={product.price}
                      />
                  ))}
              </div>
            ) : (
                <p>No products found</p>
            )}
        </div>
      </div>
    </div>
  )
}

export default Collection