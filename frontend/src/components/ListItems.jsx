import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { notify } from '.';

const ListItems = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .post('https://mernwear-backend.onrender.com/api/v1/product/all-items')
      .then((res) => {
        console.log(res.data.msg);
        setProducts(res.data.msg);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleClick = (product) => {
    console.log(product)
    axios 
    .post(`https://mernwear-backend.onrender.com/api/v1/product/delete-product/${product.name}`)
    .then((res) => {
      console.log(res.data.msg)
      notify('Product deleted successfully', 'success')
      setProducts(products.filter((item) => item.name !== product.name));
    })
    .catch((err) => {
      console.error(err)
    })
  }

  return (
    <div className="mx-[5%] mt-[3%] text-gray-700 text-lg">
      <p className="text-2xl font-semibold text-slate-700 mb-5">All Products List</p>
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-sm">
        <div className="flex items-center font-semibold text-gray-600 border-b pb-2 mb-4">
          <p className="flex-[1] text-center">Image</p>
          <p className="flex-[2] text-center">Name</p>
          <p className="flex-[2] text-center">Category</p>
          <p className="flex-[1] text-center">Price</p>
          <p className="flex-[1] text-center">Action</p>
        </div>
        {products.map((product) => (
          <div
            key={product.name}
            className="flex items-center bg-gray-50 rounded-md shadow-sm mb-3 p-4 hover:bg-slate-100 transition duration-200"
          >
            <div className="flex-[1] flex justify-center">
              <img
                src={product.images[0]}
                alt="product"
                className="w-24 h-16 object-cover rounded-md border border-gray-300"
              />
            </div>
            <p className="flex-[2] text-center text-gray-700">{product.name}</p>
            <p className="flex-[2] text-center text-gray-600 ">{product.category}</p>
            <p className="flex-[1] text-center text-gray-700 font-medium mr-[7%]">${product.price}</p>
            <button
              onClick={() => handleClick(product)}
              className="flex-[0]  text-sm text-white bg-slate-600 px-3 py-1 mr-10 rounded-md hover:bg-slate-700 transition duration-200"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListItems;
