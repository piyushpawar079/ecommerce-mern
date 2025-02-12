import express from 'express'
import { newOrder, getAllOrders, updateStatus, deleteOrder } from '../controllers/order.controller.js'

const router = express.Router()

router.post('/place-order', newOrder)
router.post('/all-orders', getAllOrders)
router.post('/update-status', updateStatus)
router.post('/delete-order', deleteOrder)

export default router 