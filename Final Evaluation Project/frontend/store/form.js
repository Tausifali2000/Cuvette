import { create } from 'zustand';
import axios from 'axios';

export const useFormStore = create(() => ({
  fetchFormFromBackend: async (formId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/form/${formId}`, {
        withCredentials: true,
      });
      return response.data.form; // Return form data
    } catch (error) {
      console.error('Failed to fetch form:', error);
      throw error;
    }
  },

  sendFormToBackend: async (formId, payload) => {
    try {
       console.log(payload);
      const response = await axios.post(
        `http://localhost:5000/api/form/${formId}/saveform`,
        payload,
        { withCredentials: true }
      );
      return {"final REsponse" : response.data }; // Return backend response
    } catch (error) {
      console.error('Failed to save form:', error);
      throw error;
    }
  },
}));

export default useFormStore;
