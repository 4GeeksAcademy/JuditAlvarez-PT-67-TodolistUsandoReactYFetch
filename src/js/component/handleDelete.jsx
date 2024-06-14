export const handleDelete = async (index, taskList, apiUrl, username, setTaskList) => {
    const updatedTasks = taskList.filter((_, i) => i !== index);
  
    try {
      const response = await fetch(`${apiUrl}/${username}`, {
        method: "PUT", // Cambiar a PUT ya que DELETE no puede actualizar la lista
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTasks),
      });
  
      if (response.ok) {
        setTaskList(updatedTasks);
      } else {
        console.error("Error: Failed to update tasks");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  