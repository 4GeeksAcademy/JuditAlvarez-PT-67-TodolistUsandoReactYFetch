import React, { useState, useEffect } from "react";

const Home = () => {
  const [input, setInput] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const apiUrl = "https://playground.4geeks.com/todo/users";

  // Obtener datos de la API
  const getData = async () => {
      const response = await fetch(`${apiUrl}/${username}`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setTaskList(data);
        } 
      }
    } 


  useEffect(() => {
    if (isLoggedIn) {
      getData();
    }
  }, [isLoggedIn]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const addTask = async () => {
    if (input) {
      const newTask = { label: input, done: false };
      const updatedTaskList = [...taskList, newTask];

      try {
        const response = await fetch(`${apiUrl}/${username}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTaskList),
        });

        if (response.ok) {
          setTaskList(updatedTaskList);
          setInput("");
        } 
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleDelete = async (index) => {
    const updatedTasks = taskList.filter((_, i) => i !== index);

    try {
      const response = await fetch(`${apiUrl}/${username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTasks),
      });

      if (response.ok) {
        setTaskList(updatedTasks);
      } 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createNewElement = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([]),
      });

      
    } catch (error) {
      console.error("Error creating or verifying user:", error);
    }
  };

  return (
    <div className="container w-75 justify-content-center text-center border border-info bg-primary">
      <h1 className="text-center">Todos</h1>
      {!isLoggedIn ? (
        <form onSubmit={createNewElement}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      ) : (
        <>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={input}
            onChange={handleInputChange}
          />
          <button onClick={addTask}>Add Task</button>
          <ul className="list-unstyled text-center mt-4 me-5">
            {taskList.map((item, index) => (
              <li key={index} className="taskItem text-center me-5">
                <button
                  className="buttonDelete btn btn-danger"
                  onClick={() => handleDelete(index)}
                >
                  x
                </button>
                {item.label}
              </li>
            ))}
          </ul>
          {taskList.length === 0 ? (
            <span className="me-5">No tasks. Add a task</span>
          ) : (
            <span className="me-5">{taskList.length} tasks remaining</span>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
