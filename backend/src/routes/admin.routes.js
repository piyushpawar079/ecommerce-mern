import express from 'express'
import { login } from '../controllers/user.controller.js'
import {upload} from '../middlewares/multer.middleware.js'
import { addProduct } from '../controllers/product.controller.js'

const router = express.Router()

router.post('/login', login)

router.post('/add-items',  upload.array('images', 4), addProduct)

export default router
