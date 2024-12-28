import mongoose from "mongoose";

const BUBBLE_TYPES = ['textBubble', 'imageBubble'];
const INPUT_TYPES = ['text', 'number', 'email', 'phone', 'date', 'rating', 'button'];

// Bubble Schema
const BubbleSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: BUBBLE_TYPES, // Restrict to predefined bubble types
    required: true,
  },
  label: {
    type: String,
    required: true, // Label to display to the end user
  },
  content: {
    type: String,
    required: true, // Information or link associated with the bubble
  },
});

// Input Schema
const InputSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: INPUT_TYPES, // Restrict to predefined input types
    required: true,
  },
  label: {
    type: String,
    required: true, // Label for the input element
  },
  hint: {
    type: String, // Optional hint for the input element
  },
});

// Element Schema
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


const FormSchema = new mongoose.Schema({
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the User model
    required: true,
  },
  
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder", // Reference the Folder model
    default: null, // Default is null for standalone forms
  },
  
  name: { 
    type: String, 
    required: true,
    trim: true 
  }, 

  elements: [ElementSchema],
   
 
 
  
});

export const Form = mongoose.model('Form', FormSchema);

