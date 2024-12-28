import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useFormFolderStore = create((set) => ({
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
      console.log("Fetched data:", response.data);
  
      const { standaloneForms, folders } = response.data.data; // Access the correct structure
  
      set({
        folders: folders, // Set folders to the folders array from the backend
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
  
  // fetchForms: async () => {
  //   set({ isLoadingForms: true });
  //   try {
  //     const response = await axios.get("http://localhost:5000/api/home");
  //     set({ forms: response.data.forms, isLoadingForms: false });
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Failed to fetch forms");
  //     set({ isLoadingForms: false });
  //   }
  // },

  // createFolder: async (folderData) => {
  //   set({ isCreatingFolder: true });
  //   try {
  //     const response = await axios.post("http://localhost:5000/api/folders", folderData);
  //     set((state) => ({ 
  //       folders: [...state.folders, response.data.folder], 
  //       isCreatingFolder: false 
  //     }));
  //     toast.success("Folder created successfully");
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Failed to create folder");
  //     set({ isCreatingFolder: false });
  //   }
  // },

  // createForm: async (formData) => {
  //   set({ isCreatingForm: true });
  //   try {
  //     const response = await axios.post("http://localhost:5000/api/forms", formData);
  //     set((state) => ({
  //       forms: [...state.forms, response.data.form],
  //       isCreatingForm: false,
  //     }));
  //     toast.success("Form created successfully");
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Failed to create form");
  //     set({ isCreatingForm: false });
  //   }
  // },

  // deleteFolder: async (folderId) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/folders/${folderId}`);
  //     set((state) => ({
  //       folders: state.folders.filter((folder) => folder._id !== folderId),
  //     }));
  //     toast.success("Folder deleted successfully");
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Failed to delete folder");
  //   }
  // },

  // deleteForm: async (formId) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/forms/${formId}`);
  //     set((state) => ({
  //       forms: state.forms.filter((form) => form._id !== formId),
  //     }));
  //     toast.success("Form deleted successfully");
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Failed to delete form");
  //   }
  // },
}));
