import mongoose from "mongoose";

const InputElementSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['text', 'number', 'email', 'phone', 'date', 'rating', 'button'], 
  },
  label: { type: String, required: true }, 
 
  
});

export const Input = mongoose.model('Input', InputElementSchema);