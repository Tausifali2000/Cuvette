import { Folder } from "../models/folder.model.js";
import { Form } from "../models/form.model.js";
import { User } from "../models/user.model.js";
import { Workspace } from "../models/workspace.model.js";
import bcryptjs from "bcryptjs";



//Get Home all Data
export async function getHome(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Fetch the workspace for the user and populate folders and forms
    const workspace = await Workspace.findOne({ user: userId })
      .populate({
        path: "folders",
        populate: {
          path: "forms",
          model: "Form",
        },
      })
      .populate("forms"); // Populate standalone forms
      console.log(workspace);
      

    if (!workspace) {
      return res.status(404).json({ success: false, message: "Workspace not found" });
    }

    res.status(200).json({
      success: true,
      data: {
        standaloneForms: workspace.forms, // Forms not associated with any folder
        folders: workspace.folders, // Folders with their forms populated
      },
    });
  } catch (error) {
    console.error("Error in getHome controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

//Create Folder
// Create Folder
export async function createFolder(req, res) {
  try {
    const { name } = req.body;

    // Workspace ID is now attached by protectRoute middleware
    const workspaceId = req.workspaceId;

    if (!workspaceId) {
      return res.status(401).json({ success: false, message: "Unauthorized - Workspace ID not found" });
    }

    if (!name) {
      return res.status(400).json({ success: false, message: "Folder name is required" });
    }

    // Check if a folder with the same name already exists in the workspace
    const existingFolder = await Folder.findOne({ name: name, workspace: workspaceId });
    if (existingFolder) {
      return res
        .status(400)
        .json({ success: false, message: "A folder with this name already exists in the workspace" });
    }

    // Create the folder
    const folder = new Folder({ name, workspace: workspaceId });
    await folder.save();

    // Link the folder to the workspace
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({ success: false, message: "Workspace not found" });
    }

    workspace.folders.push(folder._id);
    await workspace.save();

    res.status(201).json({ success: true, folder });
  } catch (error) {
    console.error("Error in createFolder controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}



//Create Form
export async function createForm(req, res) {
  try {
    const { name, folderId } = req.body;
    const workspaceId = req.workspaceId; // Assume middleware attaches `workspaceId` to the request object

    if (!workspaceId) {
      return res.status(401).json({ success: false, message: "Unauthorized - Workspace ID not found" });
    }

    if (!name) {
      return res.status(400).json({ success: false, message: "Form name is required" });
    }

    let folder = null;

    if (!folderId) {
      // Check for duplicate form names globally for standalone forms in the workspace
      const existingForm = await Form.findOne({ name, workspace: workspaceId, folder: null });
      if (existingForm) {
        return res
          .status(400)
          .json({ success: false, message: "Form name already exists as a standalone form in the workspace" });
      }
    } else {
      // Validate the folder ID and check for duplicate names within the folder
      folder = await Folder.findOne({ _id: folderId, workspace: workspaceId });
      if (!folder) {
        return res.status(400).json({ success: false, message: "Invalid folder ID or folder does not belong to workspace" });
      }

      const existingFormInFolder = await Form.findOne({ name, workspace: workspaceId, folder: folderId });
      if (existingFormInFolder) {
        return res.status(400).json({ success: false, message: "Form name already exists in this folder" });
      }
    }

    // Create the new form
    const newForm = new Form({
      name,
      workspace: workspaceId,
      folder: folderId || null, // Associate with folder if folderId exists
    });

    await newForm.save();

    // If the form is associated with a folder, update the folder's forms array
    if (folder) {
      folder.forms.push(newForm._id);
      await folder.save();
    }

    // Update the workspace's forms array
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({ success: false, message: "Workspace not found" });
    }

    // Add the form reference to the workspace if it doesn't already exist
    if (!workspace.forms.some(formId => formId.toString() === newForm._id.toString())) {
      workspace.forms.push(newForm._id);
      await workspace.save();
    }

    res.status(201).json({ success: true, form: newForm, folderId: folder?._id || null });
  } catch (error) {
    console.error("Error in createForm controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


//Get folder by ID
export async function getFolderById(req, res) {
    try {
      const folderId = req.params.id;
      const folder = await Folder.findById(folderId).populate('forms');

      if (!folder) {
        return res.status(404).json({ success: false, message: 'Folder not found' });
      }
  
      res.status(200).json(folder);
    } catch (error) {
      console.error("Error in getPostById controller:", error);
		 res.status(500).json({ message: "Server error" });
    }
}

export async function getFormById(req, res) {
  try {
    const formId = req.params.id;
    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error("Error in getFormById controller:", error);
    res.status(500).json({ message: "Server error" });
  }
}


//Delete Form by ID
export async function deleteFormById(req, res) {
  try {
    const formId = req.params.id;
    const workspaceId = req.workspaceId; // Assume middleware attaches `workspaceId` to the request object

    if (!workspaceId) {
      return res.status(401).json({ success: false, message: "Unauthorized - Workspace ID not found" });
    }

    // Find and delete the form
    const form = await Form.findOneAndDelete({ _id: formId, workspace: workspaceId });

    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found or not authorized" });
    }

    // Remove the form reference from its folder if it belongs to one
    if (form.folder) {
      const folder = await Folder.findById(form.folder);
      if (folder) {
        folder.forms.pull(form._id);
        await folder.save();
      }
    }

    // Remove the form reference from the workspace
    const workspace = await Workspace.findById(workspaceId);
    if (workspace) {
      workspace.forms.pull(form._id);
      await workspace.save();
    }

    res.status(200).json({ success: true, message: "Form deleted successfully" });
  } catch (error) {
    console.error("Error in deleteFormById controller:", error);
    res.status(500).json({ message: "Server error" });
  }
}


// Delete Folder by ID
export async function deleteFolderById(req, res) {
  try {
    const folderId = req.params.id; // Folder ID from request parameters
    const workspaceId = req.workspaceId; // Workspace ID from middleware

    if (!workspaceId) {
      return res.status(401).json({ success: false, message: "Unauthorized - Workspace ID not found" });
    }

    // Find and delete the folder associated with the workspace
    const folder = await Folder.findOneAndDelete({ _id: folderId, workspace: workspaceId });

    if (!folder) {
      return res.status(404).json({ success: false, message: "Folder not found or not authorized" });
    }

    // Remove the folder reference from the workspace
    const workspace = await Workspace.findById(workspaceId);
    if (workspace) {
      workspace.folders.pull(folderId);
      await workspace.save();
    }

    res.status(200).json({ success: true, message: "Folder deleted successfully and reference removed from workspace" });
  } catch (error) {
    console.error("Error in deleteFolderById controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}



// Update User Details
export async function updateUser(req, res) {
  try {
    const userId = req.user?.id;
    
    const { username, email, oldPassword, newPassword } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if(!oldPassword ) {
      return res.status(404).json({ success: false, message: "Please enter password" });
    }

    const isMatch = await bcryptjs.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Password is incorrect" });
      }


    if (username) {
      const existingUserByUsername = await User.findOne({ username });
      if (existingUserByUsername && existingUserByUsername._id.toString() !== userId) {
        return res.status(400).json({ success: false, message: "Username already exists" });
      }
      user.username = username;
    }
    if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    
      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail && existingUserByEmail._id.toString() !== userId) {
        return res.status(400).json({ success: false, message: "Email already exists" });
      }
      const oldEmail = user.email;
      user.email = email;

      await Workspace.updateMany(
        { "accessList.email": oldEmail },
        { $set: { "accessList.$.email": email } }
      );

      // Update workspaces owned by the user
      await Workspace.updateMany(
        { user: userId },
        { $set: { "accessList.$[elem].email": email } },
        { arrayFilters: [{ "elem.email": oldEmail }] }
      );
    }

    if ( newPassword) {
      if (newPassword.length < 6) {
        return res.status(400).json({ success: false, message: "New password must be at least 6 characters" });
      }

      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(newPassword, salt);
    }

    // Save updated user details
    await user.save();

    // Update workspace references if email changed
    if (email || username) {
      await Workspace.updateMany(
        { "accessList.email": user.email },
        { $set: { "accessList.$.email": email || user.email } }
      );
    }

    res.status(200).json({
      success: true,
      message: "User details updated successfully",
      user: {
        ...user._doc,
        password: "", // Exclude password from response
      },
    });
  } catch (error) {
    console.log("Error in updateUser controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


