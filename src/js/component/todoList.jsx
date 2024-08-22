import React, { useEffect, useState } from 'react';

function TodoList() {
    const [tareas, setTareas] = useState([])
    const [newTask, setNewTask] = useState("")

    function enterKey(event) {
        if (event.key === 'Enter') {
            postTarea();
        }
    }

    //fetch tipo GET//
    function getTareas() {
        fetch("https://playground.4geeks.com/todo/users/michelldenjoy")
            .then(respuesta => respuesta.json())
            .then(datos => setTareas(datos.todos))
            .catch(error => console.log(error))
        //no añade notas vacias y retorna el input limpio//
        if (newTask.trim() !== "") {
            let newTareas = [...tareas, newTask];
            setTareas(newTareas);
            setNewTask("");
        }
    }
    useEffect(() => {
        getTareas()
    }, [])


    //fetch tipo POST//
    function postTarea() {
        fetch('https://playground.4geeks.com/todo/todos/michelldenjoy', {
            method: "POST",
            body: JSON.stringify({ 
                "label": newTask,
                "is_done": false

            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {

                return resp.json();
            })
            .then(data => {
                console.log(data);
                getTareas()
            })
            .catch(error => {
                console.log(error);
            });
    }


    //fetch tipo Delete//
    function deleteTask(id) {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE"
        })
        .then(resp => {
            if (resp.ok) {
                setTareas(tareas.filter(tarea => tarea.id !== id));
            } else {
                console.error("Error deleting task:", resp.statusText);
            }
        })
        .catch(error => console.log(error));
  
    }

    return (

        <div className='container w-50 max-height sombra text-center'>
            <h1>To Do <span>List</span></h1>

            <div>
                <input onChange={(e) => setNewTask(e.target.value)} onKeyDown={enterKey} value={newTask} type="text" placeholder="What's next?" />
                {tareas.map(tarea => (
                    <div className='d-flex justify-content-between'>
                        <p>{tarea.label}</p>
                        <button onClick={() => deleteTask(tarea.id)}  className="fa-solid fa-trash-can boton"></button>
                    </div>
                ))}
            </div>
            <div className='d-flex'>
                <p>{tareas.length} Items left </p>

            </div>


        </div>);

};
export default TodoList;
