import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'
import productRouter from './routes/product.routes.js'
import orderRouter from './routes/order.routes.js'

const app = express();

app.use(cors({
    origin: "https://mernwear-frontend.onrender.com", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"] // Allowed headers
}));

// Handle preflight requests properly
app.options("*", cors());

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/order', orderRouter)

export { app }