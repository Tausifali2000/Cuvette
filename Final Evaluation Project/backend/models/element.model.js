
import mongoose from "mongoose";


const testSchema = new mongoose.Schema({
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


const arraySchema = new mongoose.Schema({

  
});


const ElementSchema = new mongoose.Schema({
  name: {
    type: String
  },
  element : {
    type: [testSchema]
  }

});

export const Element = mongoose.model('Element', ElementSchema);
