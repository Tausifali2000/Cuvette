import { Folder } from "../models/folder.model.js";
import { Form } from "../models/form.model.js";



//Get Home all Data
export async function getHome(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Fetch all standalone forms (forms not associated with any folder)
    const standaloneForms = await Form.find({ user: userId, folder: null });

    // Fetch all folders along with their forms
    const folders = await Folder.find({ user: userId }).populate("forms");

    res.status(200).json({
      success: true,
      data: {
        standaloneForms,
        folders,
      },
    });
  } catch (error) {
    console.error("Error in getHome controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

//Create Folder
export async function createFolder(req, res) {

      try {
        const { name } = req.body;
        const userId = req.user?.id;
        if (!userId) {
          return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        if(!name) {  //Checking all fields
          return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingFolder = await Folder.findOne({ name: name, user: userId }); //checking folder name already exists

        if (existingFolder) {  
          return res.status(400).json({ success: false, message: "Folder name already exists" });
        }
          
        let newFolder;

        newFolder = new Folder({
          name,
          user: userId,
        })

        await newFolder.save();
        res.status(201).json(newFolder);
      } catch (error) {
        console.error("Error in createPost controller:", error);
		    res.status(500).json({ success: false, message: "Internal server error" });
      }
}

//Create Form
export async function createForm(req, res) {
  try {
    const { name, folderId } = req.body

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if(!name) {
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
      const folder = await Folder.findOne({ _id: folderId, user: userId });
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
      const folder = await Folder.findOne({ _id: folderId, user: userId });
      folder.forms.push(newForm._id);
      await folder.save();
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

    if (form.folder) {
      const folder = await Folder.findById(form.folder);
      if (folder) {
        folder.forms.pull(form._id);
        await folder.save();
      }
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

    const folder = await Folder.findOneAndDelete({ _id: folderId, user: userId });

    if (!folder) {
      return res.status(404).json({ success: false, message: "Folder not found or not authorized" });
    }

    await Form.deleteMany({ folder: folderId });

    res.status(200).json({ success: true, message: "Folder and its forms deleted successfully" });
  } catch (error) {
    console.error("Error in deleteFolderById controller:", error);
    res.status(500).json({ message: "Server error" });
  }
}

