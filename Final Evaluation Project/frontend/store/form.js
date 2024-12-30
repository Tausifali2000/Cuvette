import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useForm = create((set) => ({

  createFolder: async (elements) => {
   
    console.log(elements);
    
  //   try {
  //     const response = await axios.post("http://localhost:5000/api/home/createfolder", folderData, {
  //       withCredentials: true // Ensure cookies (e.g., tokens) are included in the request
  //     });
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


}));
