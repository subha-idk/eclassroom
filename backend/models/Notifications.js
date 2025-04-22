import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    section: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // This will set the default value to the current date/time
    }
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
