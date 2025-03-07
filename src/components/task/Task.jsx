import { useContext, useState } from "react";
import "./Task.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

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

  //Appel de hook soit dans un composant, soit dehors
  const navigate = useNavigate()
  function handleClick() {
    if(props.duration>=50){
      navigate(props.id)
    }
  }

  const user = useContext(UserContext)
  console.log("user: ", user)
  
  return (
    <div className="task" style={{ backgroundColor: "violet" }}>
    {/* <Link to={`/tasks/${props.id}`}>
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
      </Link> */}
      
      <div className="title" onClick={handleClick}>{props.title}</div>
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
