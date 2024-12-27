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
default: [],
},
)



export const Folder = mongoose.model("Folder", folderSchema);