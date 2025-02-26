import { useState } from "react";
import "./Task.css";

function Task(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(props.title);
  const [newDuration, setNewDuration] = useState(props.duration);

  function handleDelete() {
    props.deleteTask(props.id);
  }

  function handleUpdate(e) {
    e.preventDefault();
    props.updateTask(props.id, newTitle, newDuration);
    setIsEditing(false);
  }

  return (
    <div className="task" style={{ backgroundColor: "violet" }}>
      <div className="title">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        ) : (
          newTitle
        )}
      </div>
      <div className="duration">
        {isEditing ? (
          <input
            type="number"
            value={newDuration}
            onChange={(e) => setNewDuration(e.target.value)}
          />
        ) : (
          newDuration
        )}
      </div>

      <div className="actions">
      {!isEditing && (
          <button type="button" id="delete" onClick={handleDelete}>
            Delete
          </button>
        )}
        {isEditing ? (
          <button type="button" onClick={handleUpdate}>
            Validate
          </button>
        ) : (
          <button type="button" id="update" onClick={() => setIsEditing(true)}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}

export default Task;
