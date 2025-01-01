import { create } from 'zustand';
import axios from 'axios';

export const useWorkspaceStore = create((set) => ({
  shareWorkspace: async (emailToShareWith, permission) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/workspace/share', // Adjust the URL based on your API
        { emailToShareWith, permission },
        { withCredentials: true }
      );

      // Check if the response is successful
      if (response.data.success) {
        // Optionally, update state here if needed
        set({ message: 'Workspace shared successfully', success: true });
      } else {
        set({ message: response.data.message, success: false });
      }
      
      return response.data; // Return the backend response
    } catch (error) {
      console.error('Failed to share workspace:', error);
      set({ message: 'Error sharing workspace. Please try again later.', success: false });
      throw error; // Propagate error to be handled elsewhere
    }
  },

  // Optional: To handle workspace message and success state
  message: '',
  success: false,
}));

export default useWorkspaceStore;
