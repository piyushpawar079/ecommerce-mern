import express from 'express'
import { getAllProducts, getSingleProduct, deleteProduct } from '../controllers/product.controller.js'

const router = express.Router()

router.post('/all-items', getAllProducts)

router.post('/singleProduct/:productName', getSingleProduct)

router.post('/delete-product/:title', deleteProduct)

export default router 