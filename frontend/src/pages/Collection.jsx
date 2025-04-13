import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Filter, ProductList } from '../components';
import { notify } from '../components';

const Collection = () => {
  const [filters, setFilters] = useState({ categories: [], types: [] });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchFilteredProducts();
  }, []);

  const fetchFilteredProducts = async (filters = {}) => {
    try {
      const res = await axios.post(
        'https://mernwear-backend.onrender.com/api/v1/product/all-items',
        filters
      );
      setProducts(res.data.msg || []);
    } catch (err) {
      notify(err?.response?.data?.error || 'Failed to fetch products', 'error');
    }
  };

  const handleFilterChange = (filterType, selectedFilters) => {
    const updatedFilters = { ...filters, [filterType]: selectedFilters };
    setFilters(updatedFilters);
    fetchFilteredProducts(updatedFilters);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 my-8 px-6 lg:px-12 max-w-[1400px] mx-auto overflow-x-hidden ml-[7%]">
      {/* Sidebar Filters */}
      <div className="w-full lg:w-1/6">
        <p className="text-black font-medium text-2xl mb-4">FILTERS</p>
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

      {/* Product Grid */}
      <div className="w-full lg:w-3/4">
        <div className="text-3xl flex gap-2 font-semibold text-slate-700 mb-6">
          All <span className="text-black">Collection</span>
          <div className="w-[20%] h-[4px] bg-[#414141] mt-4"></div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductList
                key={product.name}
                title={product.name}
                image={product.images[0]}
                price={product.price}
              />
            ))}
          </div>
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Collection;
