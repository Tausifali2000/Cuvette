import React, { useState } from 'react';
import axios from 'axios';
import BubbleImage from '../../components/bubbles/Bubbles.image';
import BubbleText from '../../components/bubbles/Bubbles.text';
import createform from './cssModules/createform.module.css';
import InputElement from '../../components/inputs/InputElement';

const CreateForm = () => {
  const [elements, setElements] = useState([]);

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

  const sendToBackend = async (data) => {
    try {
      await axios.post('http://localhost:4000/save-elements', data, {
        withCredentials: true,
      });
      alert('Data sent to backend!');
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
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
              <button onClick={() => addElement('Text Bubble')}>Text</button>
              <button onClick={() => addElement('Image Bubble')}>Image</button>
            </div>
          </div>

          <div className={createform.inputs}>
            <h2>Inputs</h2>
            <div className={createform.inputsbtn}>
              <button onClick={() => addElement('Text Input')}>Text</button>
              <button onClick={() => addElement('Number Input')}>Number</button>
              <button onClick={() => addElement('Email Input')}>Email</button>
              <button onClick={() => addElement('Phone Input')}>Phone</button>
              <button onClick={() => addElement('Date Input')}>Date</button>
              <button onClick={() => addElement('Rating Input')}>Rating</button>
              <button onClick={() => addElement('Button Input')}>Buttons</button>
            </div>
          </div>
        </div>

        <div className={createform.flow}>
          <button className="start">Start</button>
          {elements.map((element) => {
            switch (element.type) {
              case 'Text Bubble':
                return (
                  <BubbleText
                    key={element.id}
                    id={element.id}
                    label={element.label}
                    updateLabel={updateElementLabel}
                    removeElement={removeElement}
                  />
                );
              case 'Image Bubble':
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
