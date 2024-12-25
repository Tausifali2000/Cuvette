import React, { useState } from 'react';
import inputStyles from './cssModules/input.module.css';

const InputElement = ({ id, type, label, removeElement, updateLabel }) => {
  const [editableLabel, setEditableLabel] = useState(label);

  const handleBlur = () => {
    updateLabel(id, editableLabel, null); // Update label only, as `bubblecontent` isn't applicable here.
  };

  // Define dynamic hints for different input types
  const getHint = (type) => {
    switch (type) {
      case 'text':
        return 'Hint: User will enter text';
      case 'number':
        return 'Hint: User will enter a number';
      case 'email':
        return 'Hint: User will enter an email address';
      case 'phone':
        return 'Hint: User will enter a phone number';
      case 'date':
        return 'Hint: User will select the date';
      case 'rating':
        return 'Hint: User will provide a rating';
      case 'button':
        return 'Hint: User will select a button';
      default:
        return 'Hint: Input type not recognized';
    }
  };

  return (
    <div className={inputStyles.input}>
      <button className={inputStyles.inputButton} onClick={() => removeElement(id)}>
        X
      </button>
      <input
        type="text"
        value={editableLabel}
        onChange={(e) => setEditableLabel(e.target.value)}
        onBlur={handleBlur}
        placeholder="Edit label"
      />
      <p>{getHint(type)}</p>
    </div>
  );
};

export default InputElement;
