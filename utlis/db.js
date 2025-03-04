import mongoose from 'mongoose'

const DbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('MongoDB Connected')
    } catch (error) {
        console.log(`Error in DB Connection`)
    }
}

export default DbConnection