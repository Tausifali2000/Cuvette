// DialogBox.jsx
import React from "react";


const CreateDialog = ({
  type,
  title,
  inputPlaceholder,
  inputValue,
  onInputChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className={styles.dialogBox}>
      <h1>{title}</h1>
      <input
        type="text"
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={onInputChange}
      />
      <div className={styles.dialogBoxButtons}>
        <button onClick={onSubmit}>Done</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateDialog;
