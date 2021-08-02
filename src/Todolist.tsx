import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filteredType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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
    const changeToDoListTitle = (title: string) => {props.changeToDoTitle(title, props.id)}

    return <div>
        <h3><EditableSpan title={props.title} changeTitle={changeToDoListTitle}/>


            <button onClick={removeToDo}>X</button>
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
                const changeTaskTitle = (title: string) => {props.changeTaskTitle(t.id,title, props.id)}
                return <li key={t.id} className={t.isDone ? "is-done " : ""}>
                    <input type="checkbox"
                           onChange={onChangeInputHandler}
                           checked={t.isDone}/>
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    <button onClick={onRemoveHandler}>X
                    </button>
                </li>
            })
            }


        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllFilter}>All</button>
            <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveFilter}>Active
            </button>
            <button className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedFilter}>Completed
            </button>
        </div>
    </div>
}

