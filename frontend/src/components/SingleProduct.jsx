import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartList } from ".";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../store/productSlice";
import { notify } from ".";

const SingleProduct = () => {
  const { title } = useParams();
  const isUserLoggedIn = useSelector(state => state.auth.userAuth)
  const products = useSelector((state) => state.product.products)
  const dispatch = useDispatch();

  // States for product data
  const [images, setImages] = useState([]);
  const [productId, setProductId] = useState();
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [sizes, setSizes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(""); // To display the selected image
  const [selectedSizes, setSelectedSizes] = useState([]); // For size selection

  useEffect(() => {
    axios
      .post(`https://mernwear-backend.onrender.com/api/v1/product/singleProduct/${title}`)
      .then((res) => {
        const response = res.data.msg;
        setImages(response.images);
        setProductId(response._id)
        setSelectedImage(response.images[0]); // Set the first image as default
        setDesc(response.description);
        setPrice(response.price);
        setSizes(response.sizes);
      })
      .catch((err) => {
        notify(err.reponse.data.error, 'error')
      });
  }, [title]);

  // Handle size selection
  const handleSizeClick = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Add to cart button
  const handleAddToCart = () => {

    if (selectedSizes.length === 0) {
      notify('please select a valid size', 'error')
    } else if (!isUserLoggedIn){
      notify('please login first to add any products in cart', 'error')
    }
    else {
      const product = {productId, title, price, selectedImage, selectedSizes};
      dispatch(addProduct(product));
      notify('Product added to the cart', 'success')
    }
  };

  return (
    <div className="ml-[10%] mt-[3%]">
      <div className="flex">
        {/* Sidebar Images */}
        <div className="w-[12%] pr-5">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Product ${index}`}
              className={`w-full border border-gray-300 mb-3 cursor-pointer ${
                selectedImage === img ? "border-blue-500" : ""
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* Main Product Image */}
        <div className="w-[35%]">
          <img
            src={selectedImage}
            alt="Selected Product"
            className="w-full h-[400px] object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="w-[30%] pl-5 ">
          <div className="mb-5">
            <p className="text-2xl font-bold text-gray-800">{title}</p>
          </div>
          <div className="mb-5">
            <p className="text-3xl font-semibold text-black">${price}</p>
          </div>
          <div className="mb-5">
            <p className="text-lg text-gray-600">{desc}</p>
          </div>
          <div className="mb-5">
            <p className="text-xl font-semibold mb-6">Select Sizes:</p>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <div
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  className={`px-4 py-2 rounded-lg cursor-pointer border ${
                    selectedSizes.includes(size)
                      ? "bg-gray-500 text-white"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
          <div>
            <button
              onClick={handleAddToCart}
              className="w-[50%] mt-5  bg-black text-white text-lg py-2 rounded-lg hover:bg-slate-900 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
