import mongoose from "mongoose";

const INPUT_TYPES = ['text', 'number', 'email', 'phone', 'date', 'rating', 'button'];

const InputElementSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: INPUT_TYPES, 
  },
  label: { type: String, required: true }, 
  hint: {type: String, required: true}
 
  
});

export const Input = mongoose.model('Input', InputElementSchema);