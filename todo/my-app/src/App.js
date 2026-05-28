import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");


 //load and save task

useEffect(() => {
const storedTasks = JSON.parse(localStorage.getItem('tasks'));
if (storedTasks) setTasks(storedTasks);
}, []);


// useEffect(() => {
// //  const tasked = JSON.parse(localStorage.getItem('tasks'))
// //  if(tasked) setTasks(tasked)


      
// }, [tasks]);
  

  const addTask = () => {
    if (task.trim() === "") {
      toast.error("No Task is Written");
      return;
    }

    setTasks([...tasks, { text: task, completed: false }]);
    localStorage.setItem('tasks', JSON.stringify([...tasks, { text: task, completed: false }]));
    setTask("");
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    
  };

  const markComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const getTaskStyle = (completed) => {
    if (completed) {
      return { textDecoration: "line-through" };
    }
    return {};
  };

  const getButtonText = (completed) => {
    if (completed) return "Undo";
    return "Complete";
  };

 
  const getFilteredTasks = () => {
    if (filter === "completed") {
      return tasks.filter((t) => t.completed === true);
    }

    if (filter === "not") {
      return tasks.filter((t) => t.completed === false);
    }

    return tasks;
  };

  return (
    <div>
      <h2>The todo-List</h2>

      <input
        type="text"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>Add</button>
      <ToastContainer></ToastContainer>

      <br />
      <br />

      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
      <button onClick={() => setFilter("not")}>Not Completed</button>

      <ul>
        {getFilteredTasks().map((t, index) => (
          <li key={index}>
            <span style={getTaskStyle(t.completed)}>{t.text}</span>

            <button onClick={() => markComplete(index)}>
              {getButtonText(t.completed)}
            </button>

            <button onClick={() => deleteTask(index)}>Delete</button>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

