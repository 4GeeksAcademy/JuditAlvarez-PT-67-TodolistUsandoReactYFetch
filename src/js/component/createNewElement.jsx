import { useEffect } from "react";


     export const createNewElement = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(`${apiUrl}/${username}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify([]),
          });
    
          if (response.ok) {
            const data = await response.json();
            setTaskList(data); // Asumiendo que la respuesta contiene la lista actualizada de tareas
            setInput('');
          } else {
            console.error("Error: Failed to create or verify user");
          }
        } catch (error) {
          console.error("Error creating or verifying user:", error);
        }
      };
      useEffect(() => {
        if (isLoggedIn) {
          getData();
        }
      }, [getData]);