import Task from "../task/Task";

function TasksList(props) {
  return (
    <div>
      {props.tasks.map(task => {
        return <Task 
        key={task._id} 
        id={task._id} 
        title={task.title} 
        duration={task.duration}   
        deleteTask ={props.deleteTask} 
        updateTask ={props.updateTask}         
        />
      })}
    </div>
  );
}

export default TasksList;
