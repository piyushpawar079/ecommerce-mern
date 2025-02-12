import dotenv from 'dotenv'
import { app } from './app.js'
import connectDB from './DB/index.js'

dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 8000 

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`App is running on the port ${port}`)
    })
})
.catch((error) => {
    console.log('something went wrong while connecting to the database', error)
})
