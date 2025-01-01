import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useWorkspaceStore = create((set, get) => ({
  // State to hold workspaces
  workspaces: [],

  // Function to fetch accessible workspaces
  fetchWorkspaces: async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/workspace/shared", // Adjust the URL based on your API
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
      console.error("Failed to fetch workspaces:", error);
     
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  // Function to fetch detailed data for all workspaces in the state
  fetchWorkspaceDetails: async () => {
    const { workspaces } = get(); // Get current workspaces from state

    if (!workspaces.length) {
      toast.error("No workspaces to fetch details for");
      return;
    }

    try {
      const detailedWorkspaces = await Promise.all(
        workspaces.map(async (workspace) => {
          try {
            const response = await axios.get(
              `http://localhost:5000/api/workspace/shared/${workspace.id}`, // Adjust the endpoint
              { withCredentials: true }
            );

            if (response.data.success) {
              return response.data.workspace; // Return detailed workspace data
            } else {
              toast.error(
                response.data.message || `Failed to fetch details for workspace ${workspace.id}`
              );
              return null; // Skip this workspace on failure
            }
          } catch (error) {
            console.error(`Failed to fetch details for workspace ${workspace.id}:`, error);
            toast.error(
              error.response?.data?.message || `Error fetching details for workspace ${workspace.id}`
            );
            return null; // Skip this workspace on error
          }
        })
      );

      // Filter out null values and update the state
      set({ workspaces: detailedWorkspaces.filter(Boolean) });
      toast.success("Workspace details retrieved successfully");
    } catch (error) {
      console.error("Failed to fetch workspace details:", error);
      toast.error("An error occurred while fetching workspace details");
    }
  },

  // Function to share a workspace
  shareWorkspace: async (emailToShareWith, permission) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/workspace/share", // Adjust the URL based on your API
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
      console.error("Failed to share workspace:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },
}));

export default useWorkspaceStore;
