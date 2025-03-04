import MessageModel from "../models/Message.js";
import ConversationModel from "../models/Conversation.js";


export const GetMessage = async (req, res) => {

    const { senderId, receiverId } = req.body;
    if (!senderId || !receiverId) {
        return res.status(400).json({
            success: false,
            message: `${!senderId ? "Sender Id" : "Receiver Id"} is required.`,
        });
    }

    try {
        // Find the conversation
        let conversation = await ConversationModel.findOne({
            members:{
             $all:[senderId,receiverId],
             $size: 2
            },
        })


        if (conversation) {
             conversation = await MessageModel.find()// Soring messages in the messages object
        }


        res.status(200).json({
            success: true,
            message: "Messages retrieved successfully",
            data: conversation
        });

    } catch (error) {
        console.log("Error",error)
        res.status(501).json({
            success: false,
            message: "Something went wrong, please try again."
        })
    }
}