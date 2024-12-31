import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import useFormStore from './form.js';

const useSessionStore = create(
  persist(
    (set, get) => ({
      formName: '', // Holds the name of the form
      elements: [], // Holds the elements array
      isLoading: false, // Loading state

      // Initialize the state with data from the backend
      initializeState: (name, elements) => {
        set({
          formName: name,
          elements: elements.map((el) => ({
            ...el,
            id: el.id || Date.now() + Math.random(), // Add unique id if not present
          })),
        });
      },
      

      // Fetch the form and initialize the state
      fetchForm: async (formId) => {
        set({ isLoading: true });
        const { fetchFormFromBackend } = useFormStore.getState();
      
        try {
          const form = await fetchFormFromBackend(formId);
          const { name, element } = form;
      
          set({
            formName: name,
            elements: element.map((el) => ({
              ...el,
              id: el.id || Date.now() + Math.random(), // Assign unique id if not present
            })),
            isLoading: false,
          });
      
          toast.success('Form loaded successfully!');
        } catch (error) {
          toast.error('Failed to load form.');
          set({ isLoading: false });
        }
      },
      

      // Save the form to the backend
      saveForm: async (formId) => {
        const { formName, elements } = get();
        const { sendFormToBackend } = useFormStore.getState();
          
        const payload = {
          name: formName,
          elements: elements.map(({ type, label, bubblecontent }) => ({
            type,
            label,
            content: bubblecontent || "",
          })),
          
        };
        
        
          
        try {
         
          await sendFormToBackend(formId, payload);
          toast.success('Form saved successfully!');
        } catch (error) {
          toast.error('Failed to save form.');
        }
      },

      // Add, update, remove elements
      addElement: (type) => {
        set((state) => ({
          elements: [
            ...state.elements,
            {
              id: Date.now(),
              type,
              label: '',
              bubblecontent: '',
            },
          ],
        }));
      },

      updateElement: (id, newLabel, newContent) => {
        set((state) => ({
          elements: state.elements.map((el) =>
            el.id === id ? { ...el, label: newLabel, bubblecontent: newContent } : el
          ),
        }));
      },

      removeElement: (id) => {
        set((state) => ({
          elements: state.elements.filter((el) => el.id !== id),
        }));
      },

      resetFormState: () => set({ formName: '', elements: [] }),
    }),
    {
      name: 'form-storage',
      getStorage: () => sessionStorage,
    }
  )
);

export default useSessionStore;
