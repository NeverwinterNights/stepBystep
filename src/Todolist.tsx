import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filteredType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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

export function Todolist (props: TodolistPropsType) {


    const onAllFilter = () => props.changeFilter ("all", props.id)
    const onActiveFilter = () => props.changeFilter ("active", props.id)
    const onCompletedFilter = () => props.changeFilter ("completed", props.id)
    const removeToDo = () => {
        props.removeToDoList (props.id)
    }
    const addTask = (title: string) => {
        props.addTask (title, props.id)
    }
    const changeToDoListTitle = (title: string) => {
        props.changeToDoTitle (title, props.id)
    }

    return <div>
        <h3><EditableSpan title={props.title} changeTitle={changeToDoListTitle}/>


            <IconButton onClick={removeToDo}><Delete/></IconButton>
        </h3>


        <AddItemForm addItem={addTask}/>


        <ul>

            {props.tasks.map ((t) => {
                const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus (t.id, e.currentTarget.checked, props.id)
                }
                const onRemoveHandler = () => {
                    props.removeTask (t.id, props.id)
                }
                const changeTaskTitle = (title: string) => {
                    props.changeTaskTitle (t.id, title, props.id)
                }
                return <li key={t.id} className={t.isDone ? "is-done " : ""}>
                    <Checkbox color={"primary"}
                           onChange={onChangeInputHandler}
                           checked={t.isDone}/>
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>

                    <IconButton size={"small"} onClick={onRemoveHandler}>
                        <Delete/>
                    </IconButton>
                </li>
            })
            }


        </ul>
        <div>
            <Button size={"small"} variant={"contained"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    onClick={onAllFilter}>All</Button>
            <Button size={"small"} variant={"contained"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={onActiveFilter}>Active
            </Button>
            <Button size={"small"} variant={"contained"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    onClick={onCompletedFilter}>Completed </Button>
        </div>
    </div>
}

