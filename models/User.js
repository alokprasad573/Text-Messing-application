import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"
    }
}, { timestamps: true })

const UserModal = mongoose.model('User', UserSchema)
export default UserModal