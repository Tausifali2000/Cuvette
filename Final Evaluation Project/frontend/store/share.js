import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useWorkspaceStore = create((set) => ({
  // Function to fetch accessible workspaces
  fetchWorkspaces: async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/workspace/shared', // Adjust the URL based on your API
        { withCredentials: true }
      );

      if (response.data.success) {
        set({ workspaces: response.data.workspaces });
        toast.success("Workspaces retrieved successfully");
      } else {
        set({ workspaces: [] });
        toast.error(response.data.message || "Failed to fetch workspaces");
      }
    } catch (error) {
      console.error('Failed to fetch workspaces:', error);
      set({ workspaces: [] });
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  // Function to share a workspace
  shareWorkspace: async (emailToShareWith, permission) => {
    try {
      console.log(emailToShareWith, permission);
      const response = await axios.post(
        'http://localhost:5000/api/workspace/share', // Adjust the URL based on your API
        { emailToShareWith, permission },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Workspace shared successfully");
      } else {
        toast.error(response.data.message || "Failed to share workspace");
      }
      
      return response.data; // Return the backend response
    } catch (error) {
      console.error('Failed to share workspace:', error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  // State to hold workspaces
  workspaces: [],
}));

export default useWorkspaceStore;
