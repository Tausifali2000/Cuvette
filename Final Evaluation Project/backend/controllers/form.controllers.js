import { Form } from "../models/form.model.js";

export async function fetchForm(req, res) {
  try {
    const { formId } = req.params; // Get the form ID from the request params
    const userId = req.user?.id; // Get the user ID from the authenticated request

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Find the form by ID and ensure it belongs to the authenticated user
    const form = await Form.findOne({ _id: formId, user: userId }).populate('user', 'name email'); // Optional: Populate user details if needed
    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    res.status(200).json({ success: true, form });
  } catch (error) {
    console.error("Error in fetchForm controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


export async function saveForm(req, res) {
  try {
    const { formId } = req.params; // Get the form ID from the request params
    const { name, elements } = req.body; // Expect form name and elements array in the request body
    const userId = req.user?.id; // Get the user ID from the authenticated request

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Validate the request body
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ success: false, message: "Form name is required and should be a non-empty string" });
    }

    if (!Array.isArray(elements) || elements.length === 0) {
      return res.status(400).json({ success: false, message: "Elements should be a non-empty array" });
    }

    const validTypes = [
      "textBubble",
      "imageBubble",
      "textInput",
      "numberInput",
      "emailInput",
      "phoneInput",
      "dateInput",
      "ratingInput",
      "buttonInput",
    ];

    // Ensure all elements have valid types and required fields
    for (const element of elements) {
      if (!element.type || !element.label) {
        return res.status(400).json({ success: false, message: "Each element must have a 'type' and 'label'" });
      }
      if (!validTypes.includes(element.type)) {
        return res.status(400).json({ success: false, message: `Invalid element type: ${element.type}` });
      }
    }

    // Find the form by ID and ensure it belongs to the authenticated user
    const form = await Form.findOne({ _id: formId, user: userId });
    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    // Update form name
    form.name = name;

    const updatedElements = [];
    const newElements = [];

    // Separate new and existing elements
    for (const element of elements) {
      if (element._id) {
        // Existing element - check for updates
        const existingElement = form.element.id(element._id);
        if (existingElement) {
          existingElement.label = element.label || existingElement.label;
          existingElement.content = element.content || existingElement.content;
          updatedElements.push(existingElement);
        } else {
          return res.status(404).json({ success: false, message: `Element with ID ${element._id} not found` });
        }
      } else {
        // New element
        newElements.push(element);
      }
    }

    // Add new elements to the form
    form.element.push(...newElements);

    // Save the updated form
    await form.save();

    res.status(200).json({
      success: true,
      message: "Form updated successfully",
      updatedElements,
      newElements,
      form,
    });
  } catch (error) {
    console.error("Error in saveForm controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}




export async function deleteElement(req, res) {
  try {
    const { formId } = req.params; // Get the form ID from the request params
    const { elementId } = req.body; // Expect the element ID to be deleted in the request body
    const userId = req.user?.id; // Get the user ID from the authenticated request

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!elementId) {
      return res.status(400).json({ success: false, message: "Element ID is required" });
    }

    // Find the form by ID and ensure it belongs to the authenticated user
    const form = await Form.findOne({ _id: formId, user: userId });
    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    // Check if the element exists in the form
    const elementIndex = form.element.findIndex((el) => el._id.toString() === elementId);
    if (elementIndex === -1) {
      return res.status(404).json({ success: false, message: "Element not found in the form" });
    }

    // Remove the element from the form
    form.element.splice(elementIndex, 1);

    // Save the updated form
    await form.save();

    res.status(200).json({ success: true, message: "Element deleted successfully", form });
  } catch (error) {
    console.error("Error in deleteElement controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


