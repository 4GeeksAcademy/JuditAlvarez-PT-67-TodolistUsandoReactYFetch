import React, { useState, useEffect } from "react";

const Home = () => {
  const [input, setInput] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [todos, setTodos] = useState([]);
const [add, setAdd] = useState("");
  
    const getData = async () => {
      const response = await fetch('https://playground.4geeks.com/todo/users/judit_alvarez');
      if(response.ok){
        const data = await response.json();
      setTodos(data.todos);  
    }
   };
   useEffect(() => {
    getData();
  }, []);

  const text = (event) => {
    setInput(event.target.value);
  };

  const addTask = () => {
	if (input) {
	  setTaskList([...taskList, input]);
	  setInput("");
	}
  };

  const handleDelete = (index) => {
	const newArr = [];
	for (let i = 0; i < taskList.length; i++) {
		if (i !== index) {
			newArr.push(taskList[i]);
		}
	}
	setTaskList(newArr);
};
    
  return (
    <div className="container w-75 justify-content-center text-center border border-info bg-primary">
      <h1 className="text-center">Todos</h1>
      <input type="text" placeholder="What needs to be done?" value={input} onChange={text} />
      <button onClick={addTask}>Add Task</button>
      <ul className="list-unstyled text-center mt-4 me-5">
        {taskList.map((item, index) => (
          <li key={index} className="taskItem text-center me-5">
            <button className="buttonDelete btn btn-danger" onClick={() => handleDelete(index)}>x</button>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        {todos.map((item, index) => (
          <p key={index}>Tittle: {item.label} - Finished: {item.is_done ? "Yes" : "No"}</p>
        ))}
      </div>
      {taskList.length === 0 ? (<span className="me-3 fw-bold">No tasks. Add a task</span>) : <span className="me-3 fw-bold">{taskList.length} tasks remaining</span>}
    </div>
  );
};

export default Home;