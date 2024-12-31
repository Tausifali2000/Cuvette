import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import createform from './cssModules/createform.module.css';
import InputElement from '../../components/inputs/InputElement';
import BubbleElement from '../../components/bubbles/BubbleElement';
import useSessionStore from '../../../store/session';

const BuildForm = () => {
  const { formId } = useParams(); // Get the form ID from the URL
  const navigate = useNavigate(); // Navigation hook

  const {
    forms,
    isLoading,
    fetchForm,
    hasFormBeenFetched,
    saveForm,
    addElement,
    updateElement,
    removeElement,
  } = useSessionStore();

  const form = forms[formId] || { formName: '', elements: [] }; // Get specific form data

  useEffect(() => {
    if (formId && !hasFormBeenFetched(formId)) {
      fetchForm(formId); // Fetch only if the form hasn't been fetched
    }
  }, [formId, fetchForm, hasFormBeenFetched]);

  const handleSaveForm = async () => {
    if (formId) {
      await saveForm(formId); // Save the form to the backend
    } else {
      console.error('No form ID provided for saving!');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className={createform.userheader}>
        <div className="formname">
          <input
            type="text"
            placeholder="Form Name"
            value={form.formName}
            onChange={(e) =>
              useSessionStore.setState((state) => ({
                forms: {
                  ...state.forms,
                  [formId]: {
                    ...state.forms[formId],
                    formName: e.target.value,
                  },
                },
              }))
            }
          />
        </div>

        <div className="response">
          <button onClick={() => navigate(`/buildform/${formId}`)}>Flow</button>
          <button onClick={() => navigate(`/response/${formId}`)}>Response</button>
        </div>

        <div className={createform.btn}>
          <button className="share">Share</button>
          <button onClick={handleSaveForm}>Save</button>
          <button>X</button>
        </div>
      </header>

      <div className={createform.create}>
        <div className={createform.sidebar}>
          <div className={createform.bubbles}>
            <h1>Bubbles</h1>
            <button onClick={() => addElement(formId, 'textBubble')}>Text</button>
            <button onClick={() => addElement(formId, 'imageBubble')}>Image</button>
          </div>

          <div className={createform.inputs}>
            <h2>Inputs</h2>
            <button onClick={() => addElement(formId, 'textInput')}>Text</button>
            <button onClick={() => addElement(formId, 'numberInput')}>Number</button>
            <button onClick={() => addElement(formId, 'emailInput')}>Email</button>
            <button onClick={() => addElement(formId, 'phoneInput')}>Phone</button>
            <button onClick={() => addElement(formId, 'dateInput')}>Date</button>
            <button onClick={() => addElement(formId, 'ratingInput')}>Rating</button>
            <button onClick={() => addElement(formId, 'buttonInput')}>Buttons</button>
          </div>
        </div>

        <div className={createform.flow}>
          <div><button>Start</button></div>
          
            {form.elements.map((el) =>
              el.type === 'textBubble' || el.type === 'imageBubble' ? (
                <BubbleElement
                  key={el.id}
                  id={el.id}
                  type={el.type === 'textBubble' ? 'text' : 'image'}
                  label={el.label}
                  bubblecontent={el.bubblecontent}
                  updateLabel={(newLabel, newContent) =>
                    updateElement(formId, el.id, newLabel, newContent)
                  }
                  removeElement={() => removeElement(formId, el.id)}
                />
              ) : (
                <InputElement
                  key={el.id}
                  id={el.id}
                  type={el.type}
                  label={el.label}
                  updateLabel={(newLabel) =>
                    updateElement(formId, el.id, newLabel, el.bubblecontent)
                  }
                  removeElement={() => removeElement(formId, el.id)}
                />
              )
            )
          }
        </div>
      </div>
    </>
  );
};

export default BuildForm;
