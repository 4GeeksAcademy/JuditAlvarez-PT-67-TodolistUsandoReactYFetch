export const addTask = async () => {
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
