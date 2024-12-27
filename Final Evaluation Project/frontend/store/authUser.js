import axios from 'axios';
import toast from 'react-hot-toast';
import {create} from 'zustand';


export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,

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
 
  login: async (credentials) => {
		set({ isLoggingIn: true });
		try {
			const response = await axios.post("http://localhost:5000/api/auth/login", credentials);
			set({ user: response.data.user, isLoggingIn: false });
		} catch (error) {
			set({ isLoggingIn: false, user: null });
			toast.error(error.response.data.message || "Login failed");
		}
	},
  
  logout: async () => {
    set({isLoggingOut:true})
    try {
      await axios.post("http://localhost:5000/api/auth/logout")
      set({user: null, isLoggingOut: false});
    } catch (error) {
      set({isLoggingOut: false});
      toast.error(error.response.data.message || "Logout failed");
    }
  },
  
  authCheck: async () => {
    set({ isCheckingAuth: true});
    try {
     console.log("In store authcheck");
      const response = await axios.get("http://localhost:5000/api/auth/authCheck", {
        withCredentials: true, // Send cookies with the request
      });
      console.log(response);
      set({ user: response.data.user, isCheckingAuth: false});
    } catch (error) {
      set({ isCheckingAuth: false, user:null});      
    }
  },
}))