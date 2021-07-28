import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filteredType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: filteredType) => void
    addTask: (title: string) => void
}

export function Todolist (props: TodolistPropsType) {

    const [value, setValue] = useState ("");


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue (e.currentTarget.value)
    }

    const addTask = () => {
        props.addTask (value)
        setValue ("")
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        {
            if (e.charCode === 13) {
                props.addTask (value)
                setValue ("")
            }
        }
    }

    const onAllFilter = () => props.changeFilter ("all")
    const onActiveFilter = () => props.changeFilter ("active")
    const onCompletedFilter = () => props.changeFilter ("completed")


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={value} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={addTask}>+</button>
        </div>
        <ul>

            {props.tasks.map ((t) => {
                const onRemoveHandler = () => {
                    props.removeTask (t.id)
                }
                    return <li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                        <button onClick={onRemoveHandler}>X
                        </button>
                    </li>
                })
            }


        </ul>
        <div>
            <button onClick={onAllFilter}>All</button>
            <button onClick={onActiveFilter}>Active</button>
            <button onClick={onCompletedFilter}>Completed
            </button>
        </div>
    </div>
}
