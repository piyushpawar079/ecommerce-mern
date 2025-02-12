import express from 'express'
import { registerUser, login, getUser } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', login)

router.post('/getUser', getUser)

export default router