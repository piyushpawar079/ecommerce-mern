import {Product} from '../models/product.models.js'
import { fileUpload } from '../utils/cloudinary.js'


const addProduct = async (req, res) => {

    const images =  req.files
    const { productName, productDescription, category, subCategory, price, sizes } = req.body


    if (!productName || !productDescription || !category || !subCategory || !price || !sizes || images.length === 0) {
        // throw console.error('send all the fields required to add a new product in the database');
        return res.status(500).json({
            msg: "send all the fields required to add a new product in the database",
          });
    }

    const paths = []

    images.map((image) => (
        paths.push(image.path)
    ))

    if (paths.length == 0) {
        // throw new Error('images path does not exist')
        return res.status(500).json({
            msg: "images path does not exist",
          });
    }

    const existingProduct = await Product.findOne({
        name: productName
    })

    if (existingProduct) {
        // throw new Error('product already exists, try to add new product');
        return res.status(500).json({
            msg: "product already exists, try to add new product",
          });
    }

    const urlPromises = paths.map((path) => fileUpload(path)); 
    const urls = await Promise.all(urlPromises);
    const imgUrl = []

    urls.map((url) => (
        imgUrl.push(url.url)
    ))


    const sizeArray = JSON.parse(sizes);

    const newProduct = {
        name: productName,
        description: productDescription,
        category: category,
        subCategory: subCategory,
        price: parseFloat(price),
        sizes: sizeArray,
        images: imgUrl
    }

    const product = await Product.create(newProduct)

    if (!product) {
        // throw new Error('something went wrong while adding new product to the database');
        return res.status(500).json({
            msg: "something went wrong while adding new product to the database",
          });
    }

    return res.status(200).json({
        msg: 'new product added successfully'
    })
    
}

const getAllProducts = async (req, res) => {
    const { categories = [], types = [] } = req.body;

    // Build the query dynamically
    let query = {};

    if (categories.length === 1 && types.length === 0) {
        // Only one category, strict filter
        query.category = categories[0];
    } else if (categories.length === 0 && types.length === 1) {
        // Only one type, strict filter
        query.subCategory = types[0];
    } else if (categories.length > 1 && types.length === 0) {
        // Multiple categories, match any of the categories
        query.category = { $in: categories };
    } else {
        // Multiple categories, types, or both, use $or for any match
        const orConditions = [];
        if (categories.length > 0) orConditions.push({ category: { $in: categories } });
        if (types.length > 0) orConditions.push({ 
            subCategory: { $in: types } });

        // Use $or to combine conditions
        query = { $or: orConditions };
    }


    try {
        // Fetch data from the database with selected fields
        const data = await Product.find(query, {
            name: 1,
            images: 1,
            price: 1,
            category: 1,
            _id: 0,
        });

        // Check if any products were found
        // if (!data || data.length === 0) {
        //     return res.status(404).json({ msg: 'No products found for the given filters.' });
        // }

        return res.status(200).json({
            msg: data,
        });
    } catch (error) {
        // Handle unexpected errors
        return res.status(500).json({ msg: 'An error occurred while retrieving products.', error });
    }
};

const getSingleProduct = async (req, res) => {

    const { productName } = req.params

    if (!productName) {
        // throw new Error('Product name is not found')
        return res.status(500).json({
            msg: "Product name is not found",
          });
    }


    const product = await Product.findOne({
        name: productName
    })

    if (!product) {
        // throw new Error('Product not found')
        return res.status(500).json({
            msg: "Product not found",
          });
    }

    return res.status(200).json({
        msg: product
    })

}

const deleteProduct = async (req, res) => {

    const { title } = req.params

    if (!title) {
        // throw new Error('Title not provided while deleting the product')
        return res.status(500).json({
            msg: "Title not provided while deleting the product",
          });
    }

    const deletedProduct = await Product.deleteOne({
        name: title
    })

    if (!deletedProduct) {
        // throw new Error('Something went wrong while deleting a product', title)
        return res.status(500).json({
            msg: "Something went wrong while deleting a product",
            title: title
          });
    }

    res.status(200).json({
        msg: deletedProduct
    })

}



export { addProduct, getAllProducts, getSingleProduct, deleteProduct }

