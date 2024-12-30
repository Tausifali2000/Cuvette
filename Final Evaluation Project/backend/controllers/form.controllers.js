import { Form } from "../models/form.model.js";
import mongoose from "mongoose";


// export async function buildForm(req, res) {
//   try {
//     const { name, element, folder } = req.body;
//     const userId = req.user?.id;

//     if (!userId) {
//       return res.status(400).json({ success: false, message: "User ID is required" });
//     }

//     const newForm = new Form({
//       name,
//       user: userId,
//       folder: folder || null,
//       element,
//     });

//     // Save the form to the database
//     await newForm.save();
//     console.log("Form saved successfully");

//     res.status(201).json({ success: true, form: newForm });
//   } catch (error) {
//     console.error("Error creating form:", error.message);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// }

export async function saveForm(req, res) {
  try {
    const { formId } = req.params; // Get form ID from URL
    const { elements } = req.body; // Get new elements array from request body

    // Validate input
    if (!elements || !Array.isArray(elements)) {
      return res.status(400).json({ success: false, message: "Elements must be an array" });
    }

    // Find and update the form's elements
    const updatedForm = await Form.findByIdAndUpdate(
      formId,
      { $set: { element: elements } }, // Replace the elements array
      { new: true } // Return the updated document
    );

    if (!updatedForm) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    res.status(200).json({ success: true, form: updatedForm });
  } catch (error) {
    console.error("Error updating form elements:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}




export async function addElementsToForm(req, res) {
  try {
    const { formId } = req.params; // Get form ID from URL
    const { element } = req.body; // Get new elements array from request body

    // Validate formId
    if (!mongoose.Types.ObjectId.isValid(formId)) {
      return res.status(400).json({ success: false, message: "Invalid Form ID" });
    }

    // Validate elements input
    if (!element || !Array.isArray(element)) {
      return res.status(400).json({ success: false, message: "Elements must be an array" });
    }

    // Update the form by adding elements to the array
    const updatedForm = await Form.findByIdAndUpdate(
      formId,
      { $push: { el: { $each: element } } }, // Add multiple elements to the array
      { new: true } // Return the updated document
    );

    if (!updatedForm) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    res.status(200).json({ success: true, form: updatedForm });
  } catch (error) {
    console.error("Error adding elements to form:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

