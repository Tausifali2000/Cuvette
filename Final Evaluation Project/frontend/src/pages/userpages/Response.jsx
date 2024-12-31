import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const Response = () => {

  const { formId } = useParams(); // Get the form ID from the URL
  const navigate = useNavigate();
  return (
    <div>
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
    </div>
  )
}

export default Response
