import { Folder } from "../models/folder.model.js";
import { Form } from "../models/form.model.js";
import { User } from "../models/user.model.js";
import { Workspace } from "../models/workspace.model.js";

export const shareWorkspace = async (req, res) => {
  try {
    const { emailToShareWith, permission } = req.body; // Email and permission (view/edit) to share with

    const user = await User.findById(req.user._id);

    // Check if the email to share with exists
    const recipientUser = await User.findOne({ email: emailToShareWith });
    if (!recipientUser) {
      return res.status(404).json({
        success: false,
        message: "The email address you are trying to share with does not exist.",
      });
    }

    // Find all folders and forms related to this user
    const folders = await Folder.find({ user: user._id });
    const forms = await Form.find({ user: user._id });

    // Check if the folders or forms arrays are empty
    if (folders.length === 0 || forms.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No folders or forms found for this user.",
      });
    }

    // Check if workspace exists, otherwise create a new workspace
    let workspace = await Workspace.findOne({ user: user._id });

    if (!workspace) {
      // Create a new workspace if it doesn't exist
      workspace = new Workspace({
        user: user._id,
        accessList: [
          { email: user.email, permission: "edit" }, // Add the current user with 'edit' permission
        ],
        folders: folders.map((folder) => folder._id),
        forms: forms.map((form) => form._id),
      });
    }

    // Check if the email already has access to the workspace
    const existingAccess = workspace.accessList.find(
      (access) => access.email === emailToShareWith
    );
    if (existingAccess) {
      return res.status(400).json({
        success: false,
        message: "User already has access to this workspace.",
      });
    }

    // Add the user to the access list with the specified permission
    workspace.accessList.push({ email: emailToShareWith, permission });

    await workspace.save(); // Save the workspace with the updated access list

    res
      .status(200)
      .json({ success: true, message: "Workspace shared successfully." });
  } catch (error) {
    console.error("Error sharing workspace:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const fetchWorkspaces = async (req, res) => {
  try {
    // Retrieve the current user from the request
    const userId = req.user._id;

    // Fetch the user's email from the User model
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const userEmail = user.email;

    // Find all workspaces where the user's email is in the accessList
    const accessibleWorkspaces = await Workspace.find({
      "accessList.email": userEmail,
    }).populate("user", "email");

    if (accessibleWorkspaces.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No accessible workspaces found.",
        workspaces: [],
      });
    }

    // Return the accessible workspaces
    res.status(200).json({
      success: true,
      message: "Accessible workspaces retrieved successfully.",
      workspaces: accessibleWorkspaces.map((workspace) => ({
        id: workspace._id,
        ownerEmail: workspace.user.email,
        permission: workspace.accessList.find(
          (access) => access.email === userEmail
        ).permission,
      })),
    });
  } catch (error) {
    console.error("Error checking accessible workspaces:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const fetchWorkspaceDetails = async (req, res) => {
  try {
    const { workspaceId } = req.params; // Extract workspace ID from the request parameters

    // Find the workspace by ID and populate necessary fields
    const workspace = await Workspace.findById(workspaceId)
      .populate("folders")
      .populate("forms")
      .populate("user", "email username"); // Include `username` in the populated user data

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found.",
      });
    }

    // Fetch additional details for folders and forms if necessary
    const folders = await Folder.find({ _id: { $in: workspace.folders } });
    const forms = await Form.find({ _id: { $in: workspace.forms } });

    // Prepare the response data
    const workspaceData = {
      id: workspace._id,
      ownerEmail: workspace.user.email,
      ownerUsername: workspace.user.username, // Add owner's username
      accessList: workspace.accessList,
      folders: folders.map((folder) => ({
        id: folder._id,
        name: folder.name,
        createdAt: folder.createdAt,
      })),
      forms: forms.map((form) => ({
        id: form._id,
        name: form.name,
        folderId: form.folderId,
        createdAt: form.createdAt,
      })),
    };

    res.status(200).json({
      success: true,
      message: "Workspace details retrieved successfully.",
      workspace: workspaceData,
    });
  } catch (error) {
    console.error("Error fetching workspace details:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
