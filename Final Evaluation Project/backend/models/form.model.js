import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  bubbles: [BubbleSchema], 
  inputs: [InputElementSchema], 
  // sequence: [{ type: String, required: true }], 
  
});

export const Form = mongoose.model('Form', FormSchema);

