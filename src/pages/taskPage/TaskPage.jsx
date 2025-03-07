import { useEffect, useState } from "react";
import TaskForm from "../../components/taskForm/TaskForm";
import TasksList from "../../components/tasksList/TasksList";
import * as api from "../../services/tasks.service"

function TaskPage() {
  const [isVisible, setIsVisible] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDuration, setUpdatedDuration] = useState("");
  const [searchValue, setSearchValue] = useState("")

  const steps = ["enter the title", "click on add button"];

  // 2ème forme de useEffect
  useEffect(() => {
    async function fetchData() {
      try{
        setLoading(true)
        const result = await api.fetchTasks()
        setTasks(result)
        setLoading(false)
      } catch(e){
        setError(true)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  
  // 3ème forme de useEffect
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true)
  //     if (searchValue.length === 0) {
  //       console.log("tasks empty")
  //       setTasks([])
  //       setLoading(false)
  //     } else {
  //       const result = await api.fetchTasksByFilter(searchValue)
  //       console.log("tasks form api : " + searchValue)
  //       setTasks(result)
  //       setLoading(false)
  //     }
  //   }
  //   console.log("searchValue", searchValue)
  //   fetchData()
  // }, [searchValue])

  //4ème forme de useEffect
  // useEffect(() => {
  //   let didCancel = false
  //   const fetchData = async () => {
  //     setLoading(true)
  //     if (!searchValue) {
  //       setTasks([])
  //       setLoading(false)
  //     } else {
  //       const result = await api.fetchTasksByFilter(searchValue)
  //       if (!didCancel) {
  //         console.log("result: ", searchValue)

  //         setTasks(result)
  //         setLoading(false)
  //       }
  //     }
  //   }
  //   // console.log("useEffect:", searchValue)
  //   fetchData()

  //   return () => {
  //     console.log("cleanup: ", searchValue)
  //     didCancel = true
  //   }
  // }, [searchValue])

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
      <input
        type="text"
        name="title"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value)
        }}
      />
      <TaskForm addTask={addTask} />

      {error && <div>Error!!!</div>}

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
