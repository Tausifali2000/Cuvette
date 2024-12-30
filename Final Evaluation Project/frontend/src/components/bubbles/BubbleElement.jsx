import React, { useState } from 'react';
import textBubble from './cssModules/text.module.css';

const BubbleElement = () => {


  return (
     
        <div className={textBubble.bubble}>
          <button
            className={textBubble.bubbleButton}
            onClick={() => removeElement(id)}
          >
            X
          </button>
          <form>
            <input
              type="text"
              value={editableLabel}
              onChange={(e) => setEditableLabel(e.target.value)}
              onBlur={handleBlur}
              placeholder="Edit label"
            />
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={handleBlur}
              placeholder="Enter text here"
            />
          </form>
        </div>
      );
};

export default BubbleElement;
