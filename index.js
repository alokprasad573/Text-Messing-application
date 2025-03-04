import express from 'express'
import dotenv from 'dotenv'
import AuthRoutes from './routes/Auth.js'
import DbConnection from "./utlis/db.js";
import MessageRoutes from "./routes/Message.js";

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.static('public'))
app.use(express.json())



app.use('/api/auth', AuthRoutes)
app.use('/api/message', MessageRoutes)

app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`)
})

DbConnection()