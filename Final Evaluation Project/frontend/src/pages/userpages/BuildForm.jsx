import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import BubbleImage from '../../components/bubbles/Bubbles.image';
import BubbleText from '../../components/bubbles/Bubbles.text';
import createform from './cssModules/createform.module.css';
import InputElement from '../../components/inputs/InputElement';
import { useFormStore } from '../../../store/form';

const BuildForm = () => {
 

  return (
    <>
      <header className={createform.userheader}>
        <div className="formname">
          <input
            type="text"
            placeholder="Form Name"
            defaultValue=""
          />
        </div>

        <div className="response">
          <button>Flow</button>
          <button>Response</button>
        </div>

        <div className={createform.btn}>
          <div className="darkmode">Dark and Light</div>
          <button className="share">Share</button>
          <button >
           
          </button>
          <button>X</button>
        </div>
      </header>

      <div className={createform.create}>
        <div className={createform.sidebar}>
          <div className={createform.bubbles}>
            <h1>Bubbles</h1>
            <div className={createform.bubblesbtn}>
              <button >Text</button>
              <button >Image</button>
            </div>
          </div>

          <div className={createform.inputs}>
            <h2>Inputs</h2>
            <div className={createform.inputsbtn}>
              <button >Text</button>
              <button >Number</button>
              <button >Email</button>
              <button >Phone</button>
              <button >Date</button>
              <button >Rating</button>
              <button >Buttons</button>
            </div>
          </div>
        </div>

        <div className={createform.flow}>
          <button className="start">Start</button>
         
             
        </div>
      </div>
    </>
  );
};

export default BuildForm;
