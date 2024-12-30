import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useFormStore = create((set) => ({
  form: null, // Holds the fetched form data
  isLoadingForm: false, // Loading state for the form
  fetchForm: async (formId) => {
    set({ isLoadingForm: true }); // Start loading state
    try {
      const response = await axios.get(`http://localhost:5000/api/form/${formId}`, {
        withCredentials: true, // Ensure cookies (e.g., tokens) are included in the request
      });

      const { form } = response.data; // Extract form from the response
      set({ form, isLoadingForm: false }); // Update the store with the form data
    } catch (error) {
      // Handle specific error cases
      if (error.response?.status === 401) {
        toast.error("Unauthorized: Please log in again.");
        // Optional: Redirect the user to the login page
        // window.location.href = "/login";
      } else if (error.response?.status === 404) {
        toast.error("Form not found.");
      } else if (error.response?.status === 403) {
        toast.error("Forbidden: You do not have access to this resource.");
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch form");
      }
      set({ isLoadingForm: false }); // Reset loading state on error
    }
  },
  clearForm: () => {
    set({ form: null }); // Clear the form data
  },
}));

