import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useHomeStore = create((set) => ({
  folders: [],
  forms: [],
  isCreatingFolder: false,
  isCreatingForm: false,
  isLoadingFolders: false,
  isLoadingForms: false,

  fetchHome: async () => {
    set({ isLoadingFolders: true, isLoadingForms: true }); // Start loading state
    try {
      const response = await axios.get("http://localhost:5000/api/home", {
        withCredentials: true // Ensure cookies (e.g., tokens) are included in the request
      });
      
  
      const { standaloneForms, folders } = response.data.data; // Access the correct structure
  
      set({
        folders: folders?.filter((folder) => folder), // Set folders to the folders array from the backend
        forms: standaloneForms, // Set forms to the standalone forms from the backend
        isLoadingFolders: false,
        isLoadingForms: false,
      });
    } catch (error) {
      // Handle specific error cases
      if (error.response?.status === 401) {
        toast.error("Unauthorized: Please log in again.");
        // Optional: Redirect the user to the login page
        // window.location.href = "/login";
      } else if (error.response?.status === 403) {
        toast.error("Forbidden: You do not have access to this resource.");
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch folders and forms");
      }
      set({ isLoadingFolders: false, isLoadingForms: false }); // Reset loading state on error
    }
  },
  

//Create Folder
  createFolder: async (folderData) => {
    set({ isCreatingFolder: true });
    console.log(folderData);
    
    try {
      const response = await axios.post("http://localhost:5000/api/home/createfolder", folderData, {
        withCredentials: true // Ensure cookies (e.g., tokens) are included in the request
      });
      set((state) => ({ 
        folders: [...state.folders, response.data.folder], 
        isCreatingFolder: false 
      }));
      toast.success("Folder created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create folder");
      set({ isCreatingFolder: false });
    }
  },

 // Fetch forms inside a specific folder by its ID
 folderById: async (folderId) => {
  set({ isLoadingForms: true }); // Start loading forms for the folder

  try {
    const response = await axios.get(
      `http://localhost:5000/api/home/folder/${folderId}`,
      {
        withCredentials: true, // Ensure cookies (e.g., tokens) are included in the request
      }
    );

    // Update the forms state with the data from the folder
    set({
      forms: response.data.forms, // Set forms to the forms inside the selected folder
      isLoadingForms: false, // Reset loading state
    });
  } catch (error) {
    toast.error("Failed to load forms for the selected folder");
    set({ isLoadingForms: false }); // Reset loading state on error
  }
},

//create Form
createForm: async (formData) => {
  set({ isCreatingForm: true });
  try {
    const response = await axios.post(
      "http://localhost:5000/api/home/createform",
      formData,
      { withCredentials: true } // Ensure cookies are included
    );

    const newForm = response.data.form;

    set((state) => ({
      forms: [...state.forms, newForm], // Add the new form to the state
      isCreatingForm: false,
    }));

    toast.success("Type Bot created successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create Type Bot");
    set({ isCreatingForm: false });
  }
},


 
}));
