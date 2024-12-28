import mongoose from 'mongoose';

const ElementSchema = new mongoose.Schema({
  elementType: {
    type: String,
    enum: ['Bubble', 'Input'], // Define element as Bubble or Input
    required: true,
  },
  bubble: BubbleSchema, // Embedded schema for Bubbles
  input: InputSchema, // Embedded schema for Inputs
  order: {
    type: Number,
    required: true, // Order of the element in the form
  },
});