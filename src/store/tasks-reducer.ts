import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./toDoLists-reducer";


type  RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskID: string
    todolistId: string

}
type  AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}

type  ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    todolistId: string
    taskID: string
    isDone: boolean
}
type  ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string,
    title: string,
    todolistId: string
}


export type  ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType


let initialState: TaskStateType = {}


export const tasksReducer = (state = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let newState = {...state}
            newState[action.todolistId] = newState[action.todolistId].filter((t) => t.id !== action.taskID)
            return newState
        }
        case "ADD-TASK": {
            // let newState = {...state}
            // let newTask = {id: "4", title: action.title, isDone: false}
            // let newTasks =  newState[action.todolistId]
            // newTasks = [newTask, ...newTasks]
            // newState[action.todolistId] = newTasks
            // return newState


            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }

            /*ToDoListID приходит из
            экшена поэтому так указывается*/
        }
        case "CHANGE-TASK-STATUS": {
            // let newState = {...state}
            // newState[action.todolistId] = newState[action.todolistId].map((t) => t.id === action.taskID ? {
            //     ...t,
            //     isDone: action.isDone
            // } : t)
            // return newState
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((t) => t.id === action.taskID ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((t) => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let newState = {...state}
            delete newState[action.ToDoListID]
            return newState
        }

        default:
            return state
    }
}


export const removeTaskAC = (taskID: string, todolistId: string): RemoveTaskActionType => { /*Созд АТ типизируем ретурн*/
    return {
        type: "REMOVE-TASK",
        taskID: taskID,
        todolistId: todolistId
    }
}

export const AddTaskActionCreator = (title: string, todolistId: string): AddTaskActionType => {
    return {
        type: "ADD-TASK",
        title: title,
        todolistId: todolistId

    }
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {
        type: "CHANGE-TASK-STATUS",
        todolistId: todolistId,
        taskID: taskID,
        isDone: isDone
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskId: taskId,
        title: title,
        todolistId: todolistId
    }
}







