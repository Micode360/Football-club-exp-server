import mongoose from 'mongoose';


const NotificationSchema = new mongoose.Schema({
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },
        list: {
            type: mongoose.Schema.Types.Array,
            required: false,
        }
    },
    {
        timestamps: true,
    });


export const Notification = mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);
export default Notification;
