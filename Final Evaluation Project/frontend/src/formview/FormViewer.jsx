import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFormStore from '../../store/form';


const FormViewer =  () => {
 
  const { formId } = useParams();
  const [formData, setFormData] = useState(null);
  const fetchFormFromBackend = useFormStore((state) => state.fetchFormFromBackend);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const data = await fetchFormFromBackend(formId);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };
    fetchForm();
  }, [formId, fetchFormFromBackend]);

  if (!formData) {
    return <div>Loading...</div>;
  }
  
   

   return (
    <div>
    <h1>Form Details</h1>
    <pre>{JSON.stringify(formData, null, 2)}</pre>
  </div>
  )
}

export default FormViewer
