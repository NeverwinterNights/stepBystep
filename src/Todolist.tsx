import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filteredType} from "./App";


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
}

export function Todolist (props: TodolistPropsType) {

    const [value, setValue] = useState ("");
    const [error, setError] = useState ("");


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue (e.currentTarget.value)
    }
    const addTask = () => {
        if (value.trim () === "") {
            setError("Title is required")
            return
        }
        props.addTask (value.trim (), props.id)
        setValue ("")
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError("")
            if (e.charCode === 13) {
                props.addTask (value, props.id)
                setValue ("")
            }

    }
    const onAllFilter = () => props.changeFilter ("all", props.id)
    const onActiveFilter = () => props.changeFilter ("active", props.id)
    const onCompletedFilter = () => props.changeFilter ("completed", props.id)
    const removeToDo = () => {props.removeToDoList(props.id)}


    return <div>
        <h3>{props.title} <button onClick={removeToDo}>X</button> </h3>
        <div>
            <input value={value} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}/>
            <button onClick={addTask}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
        <ul>

            {props.tasks.map ((t) => {
                const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus (t.id, e.currentTarget.checked, props.id)
                }
                const onRemoveHandler = () => {
                    props.removeTask (t.id, props.id)
                }
                return <li key={t.id} className={t.isDone ? "is-done " : ""}><input type="checkbox" onChange={onChangeInputHandler} checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={onRemoveHandler}>X
                    </button>
                </li>
            })
            }


        </ul>
        <div>
            <button className={props.filter ==="all" ? "active-filter" : ""} onClick={onAllFilter}>All</button>
            <button className={props.filter ==="active" ? "active-filter" : ""} onClick={onActiveFilter}>Active</button>
            <button className={props.filter ==="completed" ? "active-filter" : ""} onClick={onCompletedFilter}>Completed
            </button>
        </div>
    </div>
}
