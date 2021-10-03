import React, {ChangeEvent, useCallback} from 'react';
import {filteredType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, ToDoListID: string) => void
    changeFilter: (value: filteredType, ToDoListID: string) => void
    addTask: (title: string, ToDoListID: string) => void
    changeStatus: (taskId: string, isDone: boolean, ToDoListID: string) => void
    filter: filteredType
    removeToDoList: (ToDoListID: string) => void
    changeTaskTitle: (taskId: string, title: string, ToDoListID: string) => void
    changeToDoTitle: (title: string, ToDoListID: string) => void

}

export const Todolist = React.memo((props: TodolistPropsType) => {


    const onAllFilter = useCallback(() => props.changeFilter("all", props.id), [props.id, props.changeFilter])
    const onActiveFilter = useCallback(() => props.changeFilter("active", props.id), [props.id, props.changeFilter])
    const onCompletedFilter = useCallback(() => props.changeFilter("completed", props.id), [props.id, props.changeFilter])


    const removeToDo = () => {
        props.removeToDoList(props.id)
    }
    const addTask = useCallback((title: string) => {/*почему тут такие зависимости*/
        props.addTask(title, props.id)
    }, [props.id, props.addTask]);


    const changeToDoListTitle = (title: string) => {
        props.changeToDoTitle(title, props.id)
    }


    let newTasks = props.tasks
    if (props.filter === "completed") {
        newTasks = newTasks.filter((t) => t.isDone)
    }
    if (props.filter === "active") {
        newTasks = newTasks.filter((t) => !t.isDone)
    }


    const removeTask = (taskID: string) => {
        props.removeTask(taskID, props.id)
    }

    const changeStatus = (taskID: string, newValue:boolean) => {
        props.changeStatus(taskID, newValue, props.id)
    }

    const changeTaskTitle = (taskID: string, title: string) => {
        props.changeTaskTitle(taskID, title, props.id)
    }



    return <div>
        <h3><EditableSpan title={props.title} changeTitle={changeToDoListTitle}/>
            <IconButton onClick={removeToDo}><Delete/></IconButton></h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {newTasks.map((t) => {

                return <Task key={t.id} task={t} removeTask={removeTask} changeStatus={changeStatus}
                             changeTaskTitle={changeTaskTitle}/>


            })
            }


        </ul>
        <div>
            <Button size={"small"} variant={"contained"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    onClick={onAllFilter}>All</Button>
            <Button style={{margin: "0 5px"}} size={"small"} variant={"contained"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={onActiveFilter}>Active
            </Button>
            <Button size={"small"} variant={"contained"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    onClick={onCompletedFilter}>Completed </Button>
        </div>
    </div>
})

