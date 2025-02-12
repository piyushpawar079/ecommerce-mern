import React, { useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { notify } from '../components';

const PlaceOrder = () => {

  const products = useSelector((state) => state.product.products);
  // const [quantities, setQuantities] = useState(
  //   products.reduce((acc, product) => {
  //     acc[product.title] = 1; // Initialize quantities to 1
  //     return acc;
  //   }, {})
  // );

  const quantity = useSelector((state) => state.product.quantity)
  const userId = useSelector((state) => state.auth.userId)
  const nav = useNavigate()
  let userName;

    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: "",
      paymentMethod: "",
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handlePlaceOrder = () => {
      const isEmpty = Object.values(formData).some(
        (value) => value.trim() === ""
      );
    
      if (isEmpty) {
        alert("All details are necessary!");
      } 
      else {
        axios
          .post('http://localhost:8000/api/v1/user/getUser', { Id: userId })
          .then((res) => {
            const userName = res.data.msg.username; // Fetch username here
            console.log(userName);
    
            const productsArray = products.map((product) => ({
              product: product.productId,
              quantity: quantity[product.title],
              price: product.price,
              title: product.title,
              size: product.selectedSizes || "default",
              image: product.selectedImage
            }));
    
            const orderData = {
              user: userName, // Username is now defined
              products: productsArray,
              totalAmount: products.reduce((acc, product) => acc + product.price * quantity[product.title], 0) + 10,
              shippingAddress: {
                lastname: formData.lastName,
                street: formData.street,
                city: formData.city,
                state: formData.state,
                zipcode: formData.zipcode,
                country: formData.country,
                phone: formData.phone
              },
              paymentMethod: formData.paymentMethod.toLowerCase()
            };
    
            axios
              .post("http://localhost:8000/api/v1/order/place-order", orderData)
              .then((data) => {
                console.log("Order placed successfully", data.data.order);
                notify('Order placed successfully')
                nav('/allOrders');
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => {
            console.log(err.msg);
          });
      }
    };
    


  return (
    <div className='ml-[10%] m-16 '>
      
    <div style={{ display: "flex"}}>
      <div className='w-[50%] '>
        <div className='flex text-2xl gap-2 font-medium mb-9  '>
          <p className='text-slate-500'>DELIVERY <span className='text-slate-700'>INFORMATION</span> </p>
          <p className='w-[10%] h-[2px] bg-[#414141] mt-3'></p>
        </div>
        <form >
          <div className='mb-5 text-lg '>
            <input
              type="text"
              name="firstName"
              className='border pl-3 pr-5 mr-3  py-1 rounded-sm'
              placeholder="First name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              className='border pl-3 pr-5 mr-3 py-1  rounded-sm'
              
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-5 text-lg '>
            <input
              type="email"
              name="email"
              className='border pl-3 pr-[38%]   mr-3 py-1  rounded-sm '
              
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              />
          </div>
          <div className='mb-5 text-lg '>
            <input
              type="text"
              name="street"
              className='border pl-3 pr-[38%]  mr-3 py-1  rounded-sm '
              
              placeholder="Street"
              value={formData.street}
              onChange={handleInputChange}
              />
          </div>
          <div className='mb-5 text-lg '>
            <input
              type="text"
              name="city"
              className='border pl-3 pr-5  mr-3 py-1  rounded-sm '
              
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="state"
              className='border pl-3 pr-5  mr-3 py-1  rounded-sm'
              
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-5 text-lg '>
          <input
            type="text"
            name="zipcode"
            className='border pl-3 pr-5  mr-3 py-1  rounded-sm'
            
            placeholder="Zipcode"
            value={formData.zipcode}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="country"
            className='border pl-3 pr-5 mr-3 py-1  rounded-sm'
            
            placeholder="Country"
            value={formData.country}
            onChange={handleInputChange}
          />
          </div>
          <input
            type="text"
            name="phone"
            className='border pl-3 pr-[38%] mr-3 py-1  rounded-sm  text-lg '
            
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </form>
      </div>

      {(
          <div className="ml-5 mt-10 w-[45%]  p-6 ">
            <div className=' flex gap-2 text-2xl mb-3 '>
              <p className='text-slate-500'>CART <span className='text-slate-700'>TOTAL</span> </p>
              <p className='w-[10%] h-[2px] bg-[#414141] mt-3'></p>
            </div>
            <div className="flex justify-between text-base text-slate-800">
              <span>Subtotal</span>
              <span>
              ${products.reduce((acc, product) => {
                const productQuantity = quantity?.[product.title] || 0; // Ensure valid quantity
                return acc + product.price * productQuantity;
              }, 0)}
              </span>
            </div>
            <hr />
            <div className="flex justify-between text-base text-slate-800 mt-2">
              <span>Shipping Fee</span>
              <span>$10.00</span>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-semibold text-slate-800 mt-4">
              <span>Total</span>
              <span>
                $
                {products.reduce((acc, product) => acc + product.price * quantity[product.title], 0) + 10}
              </span>
            </div>
            <div className='gap-6  '>
            <div className="mt-9 mb-5 flex gap-2 text-lg">
              <p className="text-slate-500">
                PAYMENT <span className="text-slate-700">METHOD</span>
              </p>
              <p className="w-[10%] h-[2px] bg-[#414141] mt-3"></p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-base">
              <label
                className="flex items-center gap-2 border px-4 py-2 rounded-md cursor-pointer hover:shadow-md hover:bg-gray-100"
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Stripe"
                  onChange={handleInputChange}
                  className="accent-black"
                />
                <span>Stripe</span>
              </label>
              <label
                className="flex items-center gap-2 border px-4 py-2 rounded-md cursor-pointer hover:shadow-md hover:bg-gray-100"
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Razorpay"
                  onChange={handleInputChange}
                  className="accent-black"
                />
                <span>Razorpay</span>
              </label>
              <label
                className="flex items-center gap-2 border px-4 py-2 rounded-md cursor-pointer hover:shadow-md hover:bg-gray-100"
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  onChange={handleInputChange}
                  className="accent-black"
                />
                <span>Cash on Delivery</span>
              </label>
            </div>

            </div>
            <button onClick={handlePlaceOrder} className="mt-6 w-full py-2 text-center text-white bg-black hover:bg-slate-800 font-medium rounded">
              Place Order
            </button>
          </div>
        )}
    </div>

      
    </div>
  )
}

export default PlaceOrder