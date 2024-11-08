import "./NotesInputData.css"

function NotesInputData({ currentTime, currentDate, notesData }) {
  return (
    <div className="notes_value_box">
      <div className="notes_date_time">
        <span>{currentTime}</span>
        <br />
        <span>{currentDate}</span>
      </div>
      <p className="notes_value">
        {notesData}
      </p>
    </div>
  )
}

export default NotesInputData