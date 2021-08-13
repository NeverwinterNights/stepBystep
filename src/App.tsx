import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export  type  filteredType = "all" | "active" | "completed"


function App () {


    type  ToDoListType = {
        id: string
        title: string
        filter: filteredType
    }


    type  TaskStateType = {
        [key: string]: Array<TaskType>
    }

    const ToDoListID_1 = v1 ()
    const ToDoListID_2 = v1 ()

    const [ToDoList, setToDoList] = useState<Array<ToDoListType>> ([
        {id: ToDoListID_1, title: "What to learn", filter: "all"},
        {id: ToDoListID_2, title: "What to bye", filter: "all"}
    ]);

    // const [filter, setFilter] = useState<filteredType> ("all");


    const [tasks, setTasks] = useState<TaskStateType> ({
        [ToDoListID_1]: [
            {id: v1 (), title: "HTML&CSS", isDone: true},
            {id: v1 (), title: "JS", isDone: true},
            {id: v1 (), title: "ReactJS", isDone: false}],
        [ToDoListID_2]: [
            {id: v1 (), title: "HTML&CSS", isDone: true},
            {id: v1 (), title: "JS", isDone: true},
            {id: v1 (), title: "ReactJS", isDone: false}]


    })


    const removeTask = (id: string, ToDoListID: string) => {

        tasks[ToDoListID] = tasks[ToDoListID].filter ((t) => t.id !== id)
        setTasks ({...tasks})
    }

    const addTask = (title: string, ToDoListID: string) => {
        let newTask = {id: v1 (), title: title, isDone: false}
        tasks[ToDoListID] = [newTask, ...tasks[ToDoListID]]
        setTasks ({...tasks})
    }

    const addToDoList = (title: string) => {
        const ToDoListID = v1 ()
        const newToDoList: ToDoListType = {
            id: ToDoListID, title: title, filter: "all",
        }
        setToDoList([...ToDoList, newToDoList])
        setTasks({...tasks, [ToDoListID]: []})
    }

    const changeStatus = (taskId: string, isDone: boolean, ToDoListID: string) => {

        tasks[ToDoListID] = tasks[ToDoListID].map ((t) => t.id === taskId ? {...t, isDone} : t)


        setTasks ({...tasks})
    }
    const removeToDoList = (ToDoListID: string) => {
        setToDoList (ToDoList.filter ((t) => t.id !== ToDoListID))
        delete tasks[ToDoListID]
    }


    const getTaskForRender = (ToDoList: ToDoListType): Array<TaskType> => {
        if (ToDoList.filter === "completed") {
            return tasks[ToDoList.id].filter ((t) => t.isDone)
        } else if (ToDoList.filter === "active") {
            return tasks[ToDoList.id].filter ((t) => !t.isDone)

        } else {
            return tasks[ToDoList.id]
        }
    }

    const changeToDoFilter = (filter: filteredType, ToDoListID: string) => {
        setToDoList (ToDoList.map ((t) => t.id === ToDoListID ? {...t, filter} : t))

    }




    const changeTaskTitle = (taskId: string, title: string, ToDoListID: string) => {

        tasks[ToDoListID] = tasks[ToDoListID].map ((t) => t.id === taskId ? {...t, title} : t)


        setTasks ({...tasks})
    }


    const componentsToDoList = ToDoList.map ((t) => {
        return (
            <Todolist
                key={t.id}
                id={t.id}
                title={t.title}
                tasks={getTaskForRender (t)}
                removeTask={removeTask}
                changeFilter={changeToDoFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={t.filter}
                removeToDoList={removeToDoList}
                changeTaskTitle={changeTaskTitle}
                changeToDoTitle={changeToDoTitle}
            />
        )
    })


    return (
        <div className="App">
            <AddItemForm addItem={addToDoList}/>
            {componentsToDoList}
        </div>
    );
}

export default App;
