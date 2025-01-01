import { Folder } from "../models/folder.model.js";
import { Form } from "../models/form.model.js";
import { User } from "../models/user.model.js";
import { Workspace } from "../models/workspace.model.js";



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
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!name) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if a folder with the same name already exists for the user
    const existingFolder = await Folder.findOne({ name: name, user: userId });
    if (existingFolder) {
      return res
        .status(400)
        .json({ success: false, message: "A folder with this name already exists" });
    }

    // Create the folder
    const folder = new Folder({ name, user: userId });
    await folder.save();

    // Link the folder to the workspace
    const workspace = await Workspace.findOne({ user: userId });
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

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!name) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    let folder = null;

    if (!folderId) {
      // Check for duplicate form names globally for standalone forms
      const existingForm = await Form.findOne({ name, user: userId, folder: null });
      if (existingForm) {
        return res.status(400).json({ success: false, message: "Form name already exists as a standalone form" });
      }
    } else {
      // If folderId is provided, validate the folder and check for duplicate names within the folder
      folder = await Folder.findOne({ _id: folderId, user: userId });
      if (!folder) {
        return res.status(400).json({ success: false, message: "Invalid folder ID" });
      }

      const existingFormInFolder = await Form.findOne({ name, folder: folderId });
      if (existingFormInFolder) {
        return res.status(400).json({ success: false, message: "Form name already exists in this folder" });
      }
    }

    // Create the new form
    const newForm = new Form({
      name,
      user: userId,
      folder: folderId || null, // Associate with folder if folderId exists
    });

    await newForm.save();

    // If the form is associated with a folder, update the folder's forms array
    if (folderId) {
      folder.forms.push(newForm._id);
      await folder.save();
    }

    // Ensure the form reference is added to the workspace
    const workspace = await Workspace.findOne({ user: userId });
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
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const form = await Form.findOneAndDelete({ _id: formId, user: userId });

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
    const workspace = await Workspace.findOne({ user: userId });
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
    const folderId = req.params.id;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Find and delete the folder
    const folder = await Folder.findOneAndDelete({ _id: folderId, user: userId });

    if (!folder) {
      return res.status(404).json({ success: false, message: "Folder not found or not authorized" });
    }

    // Remove the folder reference from the workspace
    const workspace = await Workspace.findOne({ user: userId });
    if (workspace) {
      workspace.folders.pull(folderId);
      await workspace.save();
    }

   

    res.status(200).json({ success: true, message: "Folder and its forms deleted successfully, and reference removed from workspace" });
  } catch (error) {
    console.error("Error in deleteFolderById controller:", error);
    res.status(500).json({ message: "Server error" });
  }
}



// Update User Details
export async function updateUser(req, res) {
  try {
    const userId = req.user.id; // User ID from authCheck middleware
    const { name, email, oldPassword, newPassword } = req.body; // Updated fields from the frontend

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Update name
    if (name) {
      user.name = name;
    }

    // Validate email format and check for uniqueness
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format." });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ success: false, message: "Email already exists." });
      }
      user.email = email;
    }

    // Update password
    if (oldPassword && newPassword) {
      const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ success: false, message: "Old password is incorrect." });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User details updated successfully.",
      user: {
        ...user._doc,
        password: undefined, // Remove password from the response
      },
    });
  } catch (error) {
    console.error("Error updating user details:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
}

