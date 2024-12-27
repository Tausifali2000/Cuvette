import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
 
  
});

export const Form = mongoose.model('Form', FormSchema);

