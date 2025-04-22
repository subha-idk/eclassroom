import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  section: { type: String, required: true },
  roll:{type:String,required:true},
  password:{type:String,required:true},
  createdAt: { type: Date, default: Date.now }

  // Other relevant fields
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
