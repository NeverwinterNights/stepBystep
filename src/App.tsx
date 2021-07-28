import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export  type  filteredType = "all" | "active" | "completed"



function App () {

    const [filter, setFilter] = useState<filteredType> ("all");


    const [tasks, setTasks] = useState<Array<TaskType>> ([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}

    ]);

    const removeTask = (id: number) => {
        let newTask = tasks.filter ((t) => t.id !== id)
        setTasks (newTask)
    }

    let filteredTasks = tasks

    if (filter === "active") {
        filteredTasks = tasks.filter ((t) => t.isDone == false)
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter ((t) => t.isDone !== false)
    }

    const changeFilter = (value:filteredType) => {
        setFilter(value)
    }


    return (
        <div className="App">
            <Todolist title="What to learn" tasks={filteredTasks} removeTask={removeTask} changeFilter={changeFilter}/>

        </div>
    );
}

export default App;
