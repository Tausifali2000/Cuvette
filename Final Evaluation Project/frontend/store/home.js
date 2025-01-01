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
  isUpdatingUser: false,

  fetchHome: async () => {
    set({ isLoadingFolders: true, isLoadingForms: true });
    try {
      const response = await axios.get("http://localhost:5000/api/home", {
        withCredentials: true,
      });

      const { standaloneForms, folders } = response.data.data;

      set({
        folders: folders?.filter((folder) => folder),
        forms: standaloneForms,
        isLoadingFolders: false,
        isLoadingForms: false,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized: Please log in again.");
      } else if (error.response?.status === 403) {
        toast.error("Forbidden: You do not have access to this resource.");
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch folders and forms");
      }
      set({ isLoadingFolders: false, isLoadingForms: false });
    }
  },

  createFolder: async (folderData) => {
    set({ isCreatingFolder: true });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/home/createfolder",
        folderData,
        { withCredentials: true }
      );
      set((state) => ({
        folders: [...state.folders, response.data.folder],
        isCreatingFolder: false,
      }));
      toast.success("Folder created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create folder");
      set({ isCreatingFolder: false });
    }
  },

  folderById: async (folderId) => {
    set({ isLoadingForms: true });
    try {
      const response = await axios.get(`http://localhost:5000/api/home/folder/${folderId}`, {
        withCredentials: true,
      });
      set({
        forms: response.data.forms,
        isLoadingForms: false,
      });
    } catch (error) {
      toast.error("Failed to load forms for the selected folder");
      set({ isLoadingForms: false });
    }
  },

  createForm: async (formData) => {
    set({ isCreatingForm: true });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/home/createform",
        formData,
        { withCredentials: true }
      );

      const newForm = response.data.form;

      set((state) => ({
        forms: [...state.forms, newForm],
        isCreatingForm: false,
      }));

      toast.success("Type Bot created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create Type Bot");
      set({ isCreatingForm: false });
    }
  },

  deleteForm: async (formId) => {
    try {
      await axios.delete(`http://localhost:5000/api/home/form/${formId}`, {
        withCredentials: true,
      });
      set((state) => ({
        forms: state.forms.filter((form) => form._id !== formId),
      }));
      toast.success("Form deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete form");
    }
  },

  deleteFolder: async (folderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/home/folder/${folderId}`, {
        withCredentials: true,
      });
      set((state) => ({
        folders: state.folders.filter((folder) => folder._id !== folderId),
      }));
      toast.success("Folder and its forms deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete folder");
    }
  },

  updateUser: async (userId, userData) => {
    set({ isUpdatingUser: true });
    try {
      const response = await axios.put(
        "http://localhost:5000/api/home/settings", // Adjust endpoint if needed
        userData,
        { withCredentials: true }
      );
  
      set({ isUpdatingUser: false });
      toast.success("User details updated successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update user details.");
      set({ isUpdatingUser: false });
    }
  },
  
}))
