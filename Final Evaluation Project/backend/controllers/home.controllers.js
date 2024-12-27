import { Folder } from "../models/folder.model.js";



export async function postFolders(req, res) {

      try {
        const { name } = req.body;

        if(!name) {  //Checking all fields
          return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingFolder = await Folder.findOne({ name: name }); //checking folder name already exists

        if (existingFolder) {  
          return res.status(400).json({ success: false, message: "Folder name already exists" });
        }
          
        let newFolder;

        newFolder = new Folder({
          name,
        })

        await newFolder.save();
        res.status(201).json(newFolder);
      } catch (error) {
        console.error("Error in createPost controller:", error);
		    res.status(500).json({ success: false, message: "Internal server error" });
      }
}