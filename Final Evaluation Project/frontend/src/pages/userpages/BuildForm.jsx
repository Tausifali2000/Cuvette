import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import createform from './cssModules/createform.module.css';
import InputElement from '../../components/inputs/InputElement';
import BubbleElement from '../../components/bubbles/BubbleElement';
import useSessionStore from '../../../store/session';



const BuildForm = () => {
  const { formId } = useParams(); // Get the form ID from the URL
  const {
    formName,
    elements,
    isLoading,
    fetchForm,
    addElement,
    updateElement,
    removeElement,
    saveForm,
    setFormName,
  } = useSessionStore();

  useEffect(() => {
    if (formId) {
      fetchForm(formId); // Fetch the form when the component mounts
    }
  }, []);

  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSaveForm = () => {
    saveForm(formId); // Save the form
  };

  return (
    <>
      <header className={createform.userheader}>
        <div className="formname">
          <input
            type="text"
            placeholder="Form Name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </div>

        <div className="response">
          <button>Flow</button>
          <button>Response</button>
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
            <button onClick={() => addElement('textBubble')}>Text</button>
            <button onClick={() => addElement('imageBubble')}>Image</button>
          </div>

          <div className={createform.inputs}>
            <h2>Inputs</h2>
            <button onClick={() => addElement('textInput')}>Text</button>
            <button onClick={() => addElement('numberInput')}>Number</button>
            <button onClick={() => addElement('emailInput')}>Email</button>
            <button onClick={() => addElement('phoneInput')}>Phone</button>
          </div>
        </div>

        <div className={createform.flow}>
          {elements.length > 0 ? (
            elements.map((el) =>
              el.type === 'textBubble' || el.type === 'imageBubble' ? (
                <BubbleElement
                  key={el.id}
                  id={el.id}
                  type={el.type === 'textBubble' ? 'text' : 'image'}
                  label={el.label}
                  bubblecontent={el.bubblecontent}
                  updateLabel={updateElement}
                  removeElement={removeElement}
                />
              ) : (
                <InputElement
                  key={el.id}
                  id={el.id}
                  type={el.type}
                  label={el.label}
                  updateLabel={updateElement}
                  removeElement={removeElement}
                />
              )
            )
          ) : (
            <div>No elements to display</div>
          )}
        </div>
      </div>
    </>
  );
};

export default BuildForm;
