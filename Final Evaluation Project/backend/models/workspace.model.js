import mongoose from "mongoose";

const workspaceSchema = mongoose.Schema({
 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Workspace owner
    required: true,
  },
  accessList: [
    {
      email: {
        type: String, // Email of users who have access to the workspace
        required: true,
      },
      permission: {
        type: String,
        enum: ['view', 'edit'], // Permissions for the user
        required: true,
      }
    },
  ],
  folders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
    },
  ],

  forms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
    },
  ]
});

export const Workspace = mongoose.model("Workspace", workspaceSchema);
