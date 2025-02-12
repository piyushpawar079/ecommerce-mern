import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../store/productSlice";
import { useNavigate } from "react-router-dom";
import { updateQuantity } from "../store/productSlice";
import { notify } from "./Notification";

const CartList = () => {
  const products = useSelector((state) => state.product.products); // Get cart products
  const dispatch = useDispatch();
  const nav = useNavigate();

  // State for managing quantities of products
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.title] = 1; // Initialize quantities to 1
      return acc;
    }, {})
  );

  const handleQuantityChange = (title, action) => {
    setQuantities((prev) => ({
      ...prev,
      [title]: action === "increment" ? prev[title] + 1 : Math.max(prev[title] - 1, 1),
    }));
  };

  const handleRemove = (title) => {
    dispatch(removeProduct({ title })); // Dispatch removeProduct action
    setQuantities((prev) => {
      const updated = { ...prev };
      delete updated[title];
      return updated;
    });
  };

  const handleCheckOut = () => {
    const quantity = quantities
    dispatch(updateQuantity(quantity))
    nav('/place-order')
  }

  return (
    <div className="ml-[10%] mr-[10%] mt-[4%] p-8 rounded-lg">
      <div className="flex items-center text-3xl mb-8">
        <p className="text-slate-600">
          Your <span className="text-slate-800 font-semibold">Cart</span>
        </p>
        <div className="w-[15%] h-[4px] bg-slate-500 ml-4 rounded"></div>
      </div>
      <div className=" w-full  gap-6">
        {/* Cart Items */}
        <div className="flex flex-col mb-16 gap-6 w-[104%] ">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={index}
                className="border w-full border-slate-200 p-6 flex items-center gap-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={product.selectedImage}
                  alt={product.title}
                  className="w-[120px] h-[100px] object-cover rounded-lg border border-slate-300"
                />
                <div className="flex flex-col justify-between w-full">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-medium text-slate-800">
                        {product.title}
                      </p>
                      <p className="text-base text-slate-600">
                        ${product.price}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      {product.selectedSizes.map((size) => (
                        <span
                          key={size}
                          className="px-3 py-1 text-sm rounded-full bg-slate-500 text-white font-medium border border-slate-400"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center mt-4 gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(product.title, "decrement")}
                        className="px-2 py-1 text-sm font-semibold bg-slate-200 rounded hover:bg-slate-300"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-sm border border-slate-300 rounded">
                        {quantities[product.title]}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(product.title, "increment")}
                        className="px-2 py-1 text-sm font-semibold bg-slate-200 rounded hover:bg-slate-300"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(product.title)}
                      className="text-sm bg-black text-white px-3 rounded-lg  hover:bg-slate-800 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-lg text-center">
              Your cart is empty! Start adding items.
            </p>
          )}
        </div>

        {/* Total Summary */}
        {products.length > 0 && (
          <div className="w-full  lg:w-1/3 p-6 border border-slate-200 rounded-lg bg-white shadow-md">
            <p className="text-lg text-slate-600 mb-4">
              Cart <span className="text-slate-800 font-semibold">Summary</span>
            </p>
            <div className="flex justify-between text-base text-slate-800">
              <span>Subtotal</span>
              <span>
                ${products.reduce((acc, product) => acc + product.price * quantities[product.title], 0)}
              </span>
            </div>
            <div className="flex justify-between text-base text-slate-800 mt-2">
              <span>Shipping Fee</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-slate-800 mt-4">
              <span>Total</span>
              <span>
                $
                {products.reduce((acc, product) => acc + product.price * quantities[product.title], 0) + 10}
              </span>
            </div>
            <button onClick={handleCheckOut} className="mt-6 w-full py-2 text-center text-white bg-black hover:bg-slate-800 font-medium rounded">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartList;
