import express from 'express'
import {SendMessage} from "../controllers/SendMessage.js";
import {GetMessage} from "../controllers/GetMessages.js";


const MessageRoutes = express.Router()

MessageRoutes.post('/send-message',SendMessage)
MessageRoutes.post('/get-message', GetMessage)



export default MessageRoutes