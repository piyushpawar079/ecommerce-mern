import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { notify } from "../components";

const ListOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  const fetchOrders = () => {
    axios
    .post('https://mernwear-backend.onrender.com/api/v1/user/getUser', { Id: userId })
    .then((res) => {
      const userName = res.data.msg.username; // Fetch username here

      axios
        .post("https://mernwear-backend.onrender.com/api/v1/order/all-orders", { userName })
        .then((res) => {
          setOrders(res.data.msg);
        })
        .catch((err) => {
          notify(err.msg, 'error')
        });
      
    })
    .catch((err) => {
      notify(err.msg, 'error')
    });

  };

  const deleteOrder = (id) => {

    axios
    .post('https://mernwear-backend.onrender.com/api/v1/order/delete-order', {id: id})
    .then((res) => {
      fetchOrders()
      notify('Order deleted Successfully')
    })
    .catch((err) => {
      notify(err.msg, 'error')
    })

  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="mx-[10%] my-[5%]">
      <div className="flex w-full text-2xl mb-10 font-semibold">
        <p className="text-slate-500">
          MY <span className="text-slate-700">ORDERS</span>
        </p>
        <p className="w-[5%] h-[4px] bg-[#414141] mt-3 ml-2"></p>
      </div>
      {orders.map((order) => (
        <div key={order._id} className="mb-8 border border-gray-200 rounded-lg p-5 shadow-sm">
          <div className="mb-4">
            <p className="text-gray-600">
              <span className="font-medium">Payment Method: </span>
              {order.paymentMethod}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Order Date: </span>
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Status: </span>
              {order.status}
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800 mb-4">Products:</p>
            {order.products.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-4 border-b pb-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-30 h-24 object-cover rounded-md"
                  />
                  <div>
                    <h2 className="text-md font-bold text-gray-800">
                      {product.title}
                    </h2>
                    <p className="text-gray-600">
                      <span className="font-medium">Size(s): </span>
                      {product.size?.join(", ")}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Quantity: </span>
                      {product.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-gray-800 font-medium">${product.price}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 mt-4">
            <span className="font-medium">Total Amount: </span>
            ${order.totalAmount}
          </p>
          <button
            onClick={fetchOrders}
            className="mt-4 mr-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            Trace Status
          </button>
          <button
            onClick={() => deleteOrder(order._id)}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            Delete Order
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListOrders;
