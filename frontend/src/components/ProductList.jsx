import React from 'react';
import { NavLink } from 'react-router-dom';

const ProductList = ({ title, image, price }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300">
      <NavLink to={`/singleProduct/${title}`} className="block">
        <div className="overflow-hidden h-64">
          <img
            src={image}
            alt="product_image"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="p-4 text-center">
          <p className="font-medium text-gray-800">{title}</p>
          <p className="font-semibold text-black">${price}</p>
        </div>
      </NavLink>
    </div>
  );
};

export default ProductList;
