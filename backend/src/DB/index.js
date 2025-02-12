import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const result = await mongoose.connect(`${process.env.MONGO_DB_URL}/${process.env.DB_NAME}`);

        console.log(`MongoDB connection successfull! DB host: ${result.connection.host}`)

    } catch (error) {
        console.log('Error occurred while connecting to the database', error)
        process.exit(1)
    }
}

export default connectDB;