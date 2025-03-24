import { Order } from '../models/order.models.js'
import { User } from '../models/user.models.js';
import mongoose from 'mongoose';


const newOrder = async (req, res) => {
  try {
    const {
      user, // User ID
      products, // Array of product details
      totalAmount, // Total price of the order
      shippingAddress, // Shipping address object
      paymentMethod, // Payment method
    } = req.body;

    // console.log(user, products, totalAmount, shippingAddress, paymentMethod)
    // Step 1: Validate Input Data
    if (!user || !products || !Array.isArray(products) || products.length === 0 || !totalAmount || !paymentMethod) {
      return res.status(400).json({ msg: "Missing or invalid required fields." });
    }

    const userExists = await User.findOne({ username: user });
    if (!userExists) {
        return res.status(400).json({ msg: 'User does not exist' });
    }

    // Validate shipping address
    const { lastname, street, city, state, zipcode, country, phone } = shippingAddress || {};
    if (!lastname || !street || !city || !state || !zipcode || !country || !phone) {
      return res.status(400).json({ msg: "Incomplete shipping address." });
    }

    // Validate products array
    const invalidProduct = products.some(
      (product) =>
        !product.product || // Product ID
        !product.quantity || typeof product.quantity !== "number" ||
        !product.price || typeof product.price !== "number" ||
        !product.size
    );

    if (invalidProduct) {
      return res.status(400).json({ msg: "Invalid product details in the order." });
    }

    // Step 2: Create the Order Object
    const newOrder = {
      user,
      products,
      totalAmount,
      shippingAddress: {
        lastname,
        street,
        city,
        state,
        zipcode,
        country,
        phone,
      },
      paymentMethod,
      status: "pending", // Default value
    };

    // Step 3: Save the Order to the Database
    const savedOrder = await Order.create(newOrder);

    // Step 4: Return the Saved Order to the Frontend
    return res.status(201).json({
      message: "Order placed successfully.",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({
      msg: "An error occurred while placing the order. Please try again.",
    });
  }
};

const getAllOrders = async (req, res) => {

  const userName = req.body.userName
  let orders

  if (!userName) {
    orders = await Order.find({})
  }
  else{
    orders = await Order.find({
      user: userName
    })
  }

  if (!orders) {
    // throw Error('orders not found')
    return res.status(405).json({
      msg: "Orders not found",
    });
  }

  res.status(201).json({
    msg: orders
  })

}

const updateStatus = async (req, res) => {

  const { orderId, status } = req.body;

  try {
    await Order.findByIdAndUpdate(orderId, { status: status });

    return res.status(200).json({ msg: 'Status updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Error updating order status' });
  }

}

const deleteOrder = async (req, res) => {

  const {id} = req.body
  console.log(req.body)

  if (!id) {
    // throw console.error('id not found to delete the placed order')
    return res.status(500).json({
      msg: "id not found to delete the placed order",
    });
  }

  try {
    await Order.findByIdAndDelete(id);

    return res.status(200).json({ msg: 'order deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'something went wrong while deleting the placed order status' });
  }

}

export { newOrder, getAllOrders, updateStatus, deleteOrder }

