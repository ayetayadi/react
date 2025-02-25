import { useState } from "react";
import "./TaskForm.css";

function TaskForm(props) {
  const[title, setTitle] = useState("learn")
  const[duration, setDuration] = useState(0)

  //props.sayFact("hello");
  const help = "help";
  const helpMe = () => {
    return <p> help please</p>; // will not work
  };

  function handleSubmit(e){
    e.preventDefault()
    console.log("submit")
    props.addTask(title, duration)
  }

  return (
    <div>
      <form action="" className="form" onSubmit={handleSubmit}>
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type="number" name="duration" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
        <button type="submit">Add a task</button>
        {/* {help}
        {helpMe()} */}
      </form>
    </div>
  );
}
export default TaskForm;
