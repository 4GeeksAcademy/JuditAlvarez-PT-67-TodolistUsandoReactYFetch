import React, { useState, useEffect } from "react";
import { createNewElement } from "./createNewElement";
import { addTask } from "./addTask";
import { handleInputChange } from "./handleImput";
import { handleDelete } from "./handleDelete";


const Home = () => {
  const [input, setInput] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const apiUrl = "https://playground.4geeks.com/todo/users";

  // Obtener datos de la API


 





      
   
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
