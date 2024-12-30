import mongoose from "mongoose";


const elementSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['textBubble', 'imageBubble' ,'textInput', 'numberInput', 'emailInput', 'phoneInput', 'dateInput', 'ratingInput', 'buttonInput'],
    required: true, 
  },
  label: {
    type: String,
    required: true, 
  },
  content: {
    type: String,
    
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
    
    trim: true 
  }, 

  element : [ elementSchema ]
});

export const Form = mongoose.model('Form', FormSchema);

