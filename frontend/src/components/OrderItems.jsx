import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notify } from '.'; // Assuming notify is your reusable notification function

const OrderItems = () => {
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState({}); // To store the status of each order dynamically

  useEffect(() => {
    // Fetch all orders
    axios
      .post('https://mernwear-backend.onrender.com/api/v1/order/all-orders')
      .then((res) => {
        setOrders(res.data.msg);

        // Initialize order statuses based on fetched orders
        const initialStatus = {};
        res.data.msg.forEach((order) => {
          initialStatus[order._id] = order.status || 'Order Placed';
        });
        setOrderStatus(initialStatus);
      })
      .catch((err) => {
        notify( err.response.data.error, 'error');
      });
  }, []);

  // Handle status change
  const handleStatusChange = (orderId, newStatus) => {
    // Update local state for real-time UI feedback
    setOrderStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: newStatus,
    }));
  
    // Hit the API endpoint to update the status in the database
    axios
      .post('https://mernwear-backend.onrender.com/api/v1/order/update-status', {
        orderId: orderId,
        status: newStatus,
      })
      .then((res) => {
        notify('Order status updated successfully', 'success');
      })
      .catch((err) => {
        notify('Failed to update status. Please try again.', 'error' );
        console.error(err);
  
        // Revert state if the API call fails
        setOrderStatus((prevStatus) => ({
          ...prevStatus,
          [orderId]: prevStatus[orderId] || 'Order Placed',
        }));
      });
  };
  

  return (
    <div className="mx-[5%] mt-[3%] text-gray-700 text-lg">
      <h1 className="text-2xl font-semibold mb-4">Order Page</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border p-4 mb-4 rounded-lg shadow-sm flex items-center justify-between bg-gray-50"
        >
          {/* Icon Section */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89-3.47a1 1 0 01.76 0L21 8M3 8v8.5a2 2 0 002 2h14a2 2 0 002-2V8m-18 0l9 4 9-4m-9 4v10"
                />
              </svg>
            </div>

            {/* Order Details */}
            <div>
              <h2 className="font-semibold text-gray-800">
                {order.products[0]?.title || 'Product Title'} x {order.products[0]?.quantity || 1}
              </h2>
              <p className="font-medium">Ordered By: {order.user || 'N/A'}</p>
              <p className="text-sm text-gray-500">
                Address: {`${order.shippingAddress?.street || ''}, ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''}, ${order.shippingAddress?.zipcode || ''}`}
              </p>
              <p className="text-sm text-gray-500">Phone: {order.shippingAddress?.phone || 'N/A'}</p>
            </div>
          </div>

          {/* Order Meta */}
          <div className="text-right">
            <p className="text-gray-700">Items: {order.products.length}</p>
            <p className="font-bold">${order.totalAmount || 'N/A'}</p>
            <p className="text-gray-600 text-sm">
              Payment Method: {order.paymentMethod || 'N/A'}
            </p>
            <p className="text-gray-600 text-sm">
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Order Status Dropdown */}
          <div>
          <select
            value={orderStatus[order._id] || 'Order Placed'}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
            className="px-3 py-1 border rounded text-sm font-medium text-gray-800"
          >
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderItems;
