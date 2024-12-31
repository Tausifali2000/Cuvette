import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import useFormStore from './form.js';

const useSessionStore = create(
  persist(
    (set, get) => ({
      forms: {}, // Store forms using formId as key
      isLoading: false,

      // Fetch a form and store it by formId
      fetchForm: async (formId) => {
        const { fetchFormFromBackend } = useFormStore.getState();
        set({ isLoading: true });

        try {
          const form = await fetchFormFromBackend(formId);
          
          const { name, folder, element } = form;
          console.log(folder);
          set((state) => ({
            forms: {
              ...state.forms,
              [formId]: {
                formName: name,
                folder: folder,
                elements: element.map((el) => ({
                  ...el,
                  id: el.id || Date.now() + Math.random(),
                })),
              },
            },
            isLoading: false,
          }));
          toast.success('Form loaded successfully!');
        } catch (error) {
          toast.error('Failed to load form.');
          set({ isLoading: false });
        }
      },

      // Check if a form has been fetched
      hasFormBeenFetched: (formId) => {
        return !!get().forms[formId];
      },

      // Save a form by formId
      saveForm: async (formId) => {
        const { forms } = get();
        const form = forms[formId];
        // console.log(forms)
        if (!form) return;

        const { sendFormToBackend } = useFormStore.getState();

        const payload = {
          name: form.formName || '',
          folder: forms.folder || null,
          elements: form.elements.map(({ type, label, bubblecontent }) => ({
            type,
            label:label || '',
            content: bubblecontent || '',
          })),
        };

       

        try {
          await sendFormToBackend(formId, payload);
          toast.success('Form saved successfully!');
          // console.log(payload);
          // Sync the persisted session storage state with the database
          set((state) => ({
            forms: {
              ...state.forms,
              [formId]: {
                ...form,
                formName: payload.name,
                folderId: payload.folderId,
                elements: payload.elements,
              },
            },
          }));

          // Clear the session storage data for the saved formId
          sessionStorage.removeItem(`zustand-form-storage-${formId}`);

          // Re-fetch the form data from the backend
          await get().fetchForm(formId);
        } catch (error) {
          toast.error('Failed to save form.');
        }
      },

      // Add element to a form by formId
      addElement: (formId, type) => {
        set((state) => ({
          forms: {
            ...state.forms,
            [formId]: {
              ...state.forms[formId],
              elements: [
                ...state.forms[formId].elements,
                {
                  id: Date.now(),
                  type,
                  label: '',
                  bubblecontent: '',
                },
              ],
            },
          },
        }));
      },

      // Update element in a form by formId
      updateElement: (formId, id, newLabel, newContent) => {
        set((state) => ({
          forms: {
            ...state.forms,
            [formId]: {
              ...state.forms[formId],
              elements: state.forms[formId].elements.map((el) =>
                el.id === id ? { ...el, label: newLabel, bubblecontent: newContent } : el
              ),
            },
          },
        }));
      },

      // Remove element from a form by formId
      removeElement: (formId, id) => {
        set((state) => ({
          forms: {
            ...state.forms,
            [formId]: {
              ...state.forms[formId],
              elements: state.forms[formId].elements.filter((el) => el.id !== id),
            },
          },
        }));
      },

      // Reset form state for a specific formId
      resetFormState: (formId) => {
        set((state) => ({
          forms: {
            ...state.forms,
            [formId]: { formName: '', elements: [] },
          },
        }));
      },
    }),
    {
      name: 'form-storage',
      getStorage: () => sessionStorage,
    }
  )
);

export default useSessionStore;
