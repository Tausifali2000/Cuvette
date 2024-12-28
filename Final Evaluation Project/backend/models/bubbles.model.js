import mongoose from "mongoose";

const BUBBLE_TYPES = ['textBubble', 'imageBubble'];

const BubbleSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: BUBBLE_TYPES, 
  },
  label: { type: String, required: true }, 
  content: { type: String, required: true }, 
  
});

export const Bubble = mongoose.model('Bubble', BubbleSchema);