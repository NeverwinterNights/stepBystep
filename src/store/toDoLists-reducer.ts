import {filteredType, ToDoListType} from "../App";
import {v1} from "uuid";


export type  RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    ToDoListID: string
}
export type  AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}
export type  ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string,
    ToDoListID: string
}
export type  ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: filteredType
    ToDoListID: string
}


export type  ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


let initialState:Array<ToDoListType> =[]

export const toDoListsReducer = (toDoList =initialState, action: ActionType): Array<ToDoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return toDoList.filter ((t) => t.id !== action.ToDoListID) /*ToDoListID приходит из
            экшена поэтому так указывается*/
        }
        case "ADD-TODOLIST": {
            const newToDoList: ToDoListType = {
                id: action.todolistId, title: action.title, filter: "all",
            }
            return [...toDoList, newToDoList] /*ToDoListID приходит из
            экшена поэтому так указывается*/
        }
        case "CHANGE-TODOLIST-TITLE": {
            return toDoList.map ((t) => t.id === action.ToDoListID ? {...t, title: action.title} : t)
        }
        case  "CHANGE-TODOLIST-FILTER": {
            return toDoList.map ((t) => t.id === action.ToDoListID ? {...t, filter: action.filter} : t)
        }
        default:
            return toDoList
    }
}


export const RemoveTodolistActionCreator = (ToDoListID: string): RemoveTodolistActionType => { /*Созд АТ типизируем ретурн*/
    return {
        type: "REMOVE-TODOLIST",
        ToDoListID: ToDoListID /*ругается на стринг,  ToDoListID: string параметр просто указываем в параметрах,
         поосле переносчим знач из пар в знач обьекта ToDoListID: ToDoListID*/
    }
}

export const AddTodolistActionCreator = (title: string): AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST",
        title: title,
        todolistId: v1()
    }
}
export const ChangeTodolistTitleActionCreator = (title: string, ToDoListID: string): ChangeTodolistTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        title: title,
        ToDoListID: ToDoListID
    }
}

export const ChangeTodolistFilterActionCreator = (filter: filteredType, ToDoListID: string): ChangeTodolistFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        filter: filter,
        ToDoListID: ToDoListID
    }
}

