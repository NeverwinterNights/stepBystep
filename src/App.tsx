import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export  type  filteredType = "all" | "active" | "completed"


function App () {

    const [filter, setFilter] = useState<filteredType> ("all");


    const [tasks, setTasks] = useState<Array<TaskType>> ([
        {id: v1 (), title: "HTML&CSS", isDone: true},
        {id: v1 (), title: "JS", isDone: true},
        {id: v1 (), title: "ReactJS", isDone: false}

    ]);

    const removeTask = (id: string) => {
        let newTask = tasks.filter ((t) => t.id !== id)
        setTasks (newTask)
    }

    const addTask = (title: string) => {
        let newTask = {id: v1 (), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks (newTasks)
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
        let findTask = tasks.find( (t) => t.id===taskId )
        if (findTask) {
            findTask.isDone = isDone
        }

        setTasks([...tasks])
    }




    let filteredTasks = tasks

    if (filter === "active") {
        filteredTasks = tasks.filter ((t) => t.isDone == false)
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter ((t) => t.isDone !== false)
    }

    const changeFilter = (value: filteredType) => {
        setFilter (value)
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />

        </div>
    );
}

export default App;
