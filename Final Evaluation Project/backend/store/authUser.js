import axios from 'axios';
import toast from 'react-hot-toast';
import {create} from 'zustand';


export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  signup: async (credentials) => {
    set({isSigningUp: true})
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", credentials);
      set({user:response.data.user, isSigningUp: false}) //fetching backend success response
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
      set({ isSigningUp: false, user: null});
      console.error("Signup Error:", error.response?.data || error.message);
    }
  },
  login: async () => {},
  logout: async () => {},
  authCheck: async () => {},
}))