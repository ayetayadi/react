import { useState } from "react";
import TaskForm from "../../components/taskForm/TaskForm";
import TasksList from "../../components/tasksList/TasksList";

function TaskPage() {
  const [isVisible, setIsVisible] = useState(true);
  const [tasks, setTasks] = useState([
    {
      _id: "1",
      title: "learn html",
      duration: 20,
    },
    {
      _id: "2",
      title: "learn css",
      duration: 30,
    },
    {
      _id: "3",
      title: "learn js",
      duration: 60,
    },
  ]);

  const [editingTask, setEditingTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDuration, setUpdatedDuration] = useState("");

  const steps = ["enter the title", "click on add button"];
  const loading = false;

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  function addTask(title, duration) {
    const newTask = {
      _id: Math.random().toString(),
      title: title,
      duration: duration,
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task._id !== id);
    setTasks(updatedTasks);
  }

  function updateTask(id, updatedTitle, updatedDuration) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, title: updatedTitle, duration: updatedDuration } : task
      )
    );
    setEditingTask(null);
  }

  const handleEditClick = (task) => {
    setEditingTask(task._id);
    setUpdatedTitle(task.title);
    setUpdatedDuration(task.duration);
  };

  const handleUpdateSubmit = (id) => {
    updateTask(id, updatedTitle, updatedDuration);
  };

  return (
    <div>
      <ul>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      <button onClick={handleVisibility}>Toggle Visibility</button>

      <TaskForm addTask={addTask} />

      {loading && <div>loading...</div>}

      {!loading && isVisible && (
        <TasksList
          tasks={tasks}
          deleteTask={deleteTask}
          updateTask={updateTask}
          handleEditClick={handleEditClick}
        />
      )}

      {editingTask && (
        <div>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <input
            type="number"
            value={updatedDuration}
            onChange={(e) => setUpdatedDuration(e.target.value)}
          />
          <button onClick={() => handleUpdateSubmit(editingTask)}>Validate</button>
        </div>
      )}
    </div>
  );
}

export default TaskPage;
