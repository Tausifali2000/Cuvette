import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import BubbleImage from '../../components/bubbles/Bubbles.image';
import BubbleText from '../../components/bubbles/Bubbles.text';
import createform from './cssModules/createform.module.css';
import InputElement from '../../components/inputs/InputElement';
import { des } from '../Destructure';

const CreateForm = () => {
  const { formId } = useParams();

  useEffect(() => {
    console.log("Form ID:", formId); // Fetch or use the form data based on formId
  }, [formId]);

  const [elements, setElements] = useState([]);

  console.log(elements);
  
    
    des(elements);
 
  const addElement = (type) => {
    // Count existing elements of the same type
    const count = elements.filter((el) => el.type === type).length + 1;

    setElements((prev) => [
      ...prev,
      { type, id: Date.now(), label: `${type} ${count > 1 ? count : ''}`.trim() },
    ]);
  };

  const updateElementLabel = (id, newLabel, newContent) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? { ...el, label: newLabel, bubblecontent: newContent }
          : el
      )
    );
  };

  const removeElement = (id) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };


  const saveData = () => {
    console.log(elements);
    // sendToBackend(elements);
  };

  return (
    <>
      <header className={createform.userheader}>
        <div className="formname">
          <input type="text" placeholder="Form Name" />
        </div>

        <div className="response">
          <button>Flow</button>
          <button>Response</button>
        </div>

        <div className={createform.btn}>
          <div className="darkmode">Dark and Light</div>
          <button className="share">Share</button>
          <button onClick={saveData}>Save</button>
          <button>X</button>
        </div>
      </header>

      <div className={createform.create}>
        <div className={createform.sidebar}>
          <div className={createform.bubbles}>
            <h1>Bubbles</h1>
            <div className={createform.bubblesbtn}>
              <button onClick={() => addElement('textBubble')}>Text</button>
              <button onClick={() => addElement('imageBubble')}>Image</button>
            </div>
          </div>

          <div className={createform.inputs}>
            <h2>Inputs</h2>
            <div className={createform.inputsbtn}>
              <button onClick={() => addElement('textInput')}>Text</button>
              <button onClick={() => addElement('numberInput')}>Number</button>
              <button onClick={() => addElement('emailInput')}>Email</button>
              <button onClick={() => addElement('phoneInput')}>Phone</button>
              <button onClick={() => addElement('dateInput')}>Date</button>
              <button onClick={() => addElement('ratingInput')}>Rating</button>
              <button onClick={() => addElement('buttonInput')}>Buttons</button>
            </div>
          </div>
        </div>

        <div className={createform.flow}>
          <button className="start">Start</button>
          {elements.map((element) => {
            switch (element.type) {
              case 'textBubble':
                return (
                  <BubbleText
                    key={element.id}
                    id={element.id}
                    label={element.label}
                    updateLabel={updateElementLabel}
                    removeElement={removeElement}
                  />
                );
              case 'imageBubble':
                return (
                  <BubbleImage
                    key={element.id}
                    id={element.id}
                    label={element.label}
                    updateLabel={updateElementLabel}
                    removeElement={removeElement}
                  />
                );
              default:
                return (
                  <InputElement
                    key={element.id}
                    id={element.id}
                    type={element.type.split(' ')[0].toLowerCase()}
                    label={element.label}
                    updateLabel={updateElementLabel}
                    removeElement={removeElement}
                  />
                );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default CreateForm;
