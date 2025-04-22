import mongoose from "mongoose";

// Define schema for the "Section" list
const sectionSchema = new mongoose.Schema({
    dept: {
        type: String,
        required: true
    },
    shift: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a Mongoose model based on the schema
const Section = mongoose.model('Section', sectionSchema);

// Export the model
export default Section
