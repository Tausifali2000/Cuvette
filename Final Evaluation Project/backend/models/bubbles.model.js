import mongoose from "mongoose";

const BubbleSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['text', 'image'], 
  },
  label: { type: String, required: true }, 
  content: { type: String, required: true }, 
  
});

export const Bubble = mongoose.model('Bubble', BubbleSchema);