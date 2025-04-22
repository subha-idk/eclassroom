import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const connectDB = async () =>{


        try {
                await mongoose.connect(process.env.MONGO_URL).then(()=>{
                        console.log("Database connected......");
                });
                
        } catch (error) {
                console.error('MongoDB connection error:', error.message);
                process.exit(1); // Exit process with failure
        }
}

export default connectDB;