import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { notify } from '.'

const AddItems = () => {
  const [uploadedImages, setUploadedImages] = useState([null, null, null, null]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('TopWear');
  const [price, setPrice] = useState('');
  const nav = useNavigate();

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];

    if (file) {
      const newImages = [...uploadedImages];
      newImages[index] = file; // Store the file directly, not the base64 string
      setUploadedImages(newImages);
    }
  };

  const handleSizeClick = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    uploadedImages.forEach((image, index) => {
      if (image) {
        formData.append('images', image); // Append the file itself, not the base64 string
      }
    });

    // Append other form fields to FormData
    formData.append('productName', productName);
    formData.append('productDescription', productDescription);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('price', price);
    formData.append('sizes', JSON.stringify(selectedSizes)); // Convert array to string for storage

    try {
      const response = await axios.post('https://mernwear-backend.onrender.com/api/v1/admin/add-items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      });
      notify('Product added successfully', 'success')
      nav('/admin/v1/list-items')
    } catch (error) {
      notify(error.response.data.msg, 'error')
    }
  };

  return (
    <div>
      <div className="px-20 py-10 text-xl">
        <p className="mb-5 text-lg">Upload Images</p>
        <div className="flex w-full">
          {uploadedImages.map((image, index) => (
            <label key={index} className="w-[10%]">
              <img
                src={
                  image
                    ? URL.createObjectURL(image) // Use URL.createObjectURL for previews
                    : 'https://imgs.search.brave.com/tQ0CKEGBf1uUuU0f7RfwFFl2fH3oMBcf7x_eoXPtGTc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzY0LzE2LzU5/LzM2MF9GXzE2NDE2/NTk3MV9FTHhQUHdk/d0hZRWhnNHZaM0Y0/RWo3T21aVnpxcTRP/di5qcGc'
                } // Default image if no file is uploaded
                alt=""
                className="w-[90%] border cursor-pointer"
              />
              <input
                type="file"
                hidden
                onChange={(e) => handleImageUpload(index, e)}
              />
            </label>
          ))}
        </div>

        <div className="mt-5">
          <p className="mb-5">Product Name</p>
          <input
            className="border bg-slate-50 pr-[20%] py-2 pl-3 rounded-lg"
            placeholder="Type here"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="mt-5">
          <p className="mb-5">Product Description</p>
          <input
            className="border bg-slate-50 pr-[20%] py-2 pb-10 pl-3 rounded-lg"
            placeholder="Write content here"
            type="text"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>

        <div className="flex mt-5 gap-5">
          <div>
            <p className="pb-5">Product Category</p>
            <select
              className="border py-2 px-3 rounded-lg pr-7 cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className="pl-5">
            <p className="pb-5">Sub Category</p>
            <select
              className="border py-2 pl-3 rounded-lg cursor-pointer"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="TopWear">TopWear</option>
              <option value="BottomWear">BottomWear</option>
              <option value="WinterWear">WinterWear</option>
              <option value="SummerWear">SummerWear</option>
            </select>
          </div>

          <div className="pl-6">
            <p className="pb-5">Price</p>
            <input
              className="border py-[7px] pl-3 rounded-lg w-[50%]"
              type="number"
              placeholder="25"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2">Product Sizes</p>
          <div className="flex gap-3 text-lg">
            {sizes.map((size) => (
              <div key={size}>
                <p
                  onClick={() => handleSizeClick(size)}
                  className={`px-3 py-0.5 cursor-pointer ${
                    selectedSizes.includes(size)
                      ? 'bg-slate-500 text-white'
                      : 'bg-slate-200'
                  }`}
                >
                  {size}
                </p>
              </div>
            ))}
          </div>
        </div>


        <button
          className="mt-5 bg-black text-white py-2 px-8 rounded-lg text-lg"
          onClick={handleSubmit}
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default AddItems;
