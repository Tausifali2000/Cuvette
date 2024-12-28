import mongoose from "mongoose";

const folderSchema = mongoose.Schema({
 
  
  name: {
    type: String,
    required: true,
    trim: true,
  },
  
  forms : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
  },
],
user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User", // Reference the User model
  required: true,
},
},
)



export const Folder = mongoose.model("Folder", folderSchema);