import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import AppBar from '@material-ui/core/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistActionCreator,
    ChangeTodolistFilterActionCreator,
    ChangeTodolistTitleActionCreator,
    RemoveTodolistActionCreator
} from "./store/toDoLists-reducer";
import {AddTaskActionCreator, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export  type  filteredType = "all" | "active" | "completed"
export  type  ToDoListType = {
    id: string
    title: string
    filter: filteredType
}
export  type  TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const toDoListID_1 = v1()
    const toDoListID_2 = v1()

    let toDoList = useSelector<AppRootStateType, Array<ToDoListType>>(state => state.toDoList)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    let dispatch = useDispatch()


    const removeTask = (id: string, ToDoListID: string) => {
        dispatch(removeTaskAC(id, ToDoListID))
    }

    const addTask = (title: string, ToDoListID: string) => {
        dispatch(AddTaskActionCreator(title, ToDoListID))
    }

    const changeStatus = (taskId: string, isDone: boolean, ToDoListID: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, ToDoListID))
    }

    const changeTaskTitle = (taskId: string, title: string, ToDoListID: string) => {
        dispatch(changeTaskTitleAC(taskId, title, ToDoListID))
    }

    const changeToDoFilter = (filter: filteredType, ToDoListID: string) => {
        dispatch(ChangeTodolistFilterActionCreator(filter, ToDoListID))
    }

    const changeToDoTitle = (title: string, ToDoListID: string) => {
        dispatch(ChangeTodolistTitleActionCreator(title, ToDoListID))
    }

    const removeToDoList = (ToDoListID: string) => {
        let action = RemoveTodolistActionCreator(ToDoListID)
        dispatch(action)
    }

    const addToDoList = (title: string) => {
        let action = AddTodolistActionCreator(title)
        dispatch(action)
    }


    const getTaskForRender = (ToDoList: ToDoListType): Array<TaskType> => {
        if (ToDoList.filter === "completed") {
            return tasks[ToDoList.id].filter((t) => t.isDone)
        } else if (ToDoList.filter === "active") {
            return tasks[ToDoList.id].filter((t) => !t.isDone)

        } else {
            return tasks[ToDoList.id]
        }
    }
    const componentsToDoList = toDoList.map((t) => {
        return (
            <Grid item>
                <Paper style={{padding: "20px"}} elevation={5}>
                    <Todolist
                        key={t.id}
                        id={t.id}
                        title={t.title}
                        tasks={getTaskForRender(t)}
                        removeTask={removeTask}
                        changeFilter={changeToDoFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={t.filter}
                        removeToDoList={removeToDoList}
                        changeTaskTitle={changeTaskTitle}
                        changeToDoTitle={changeToDoTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{marginTop: "20px"}}>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={5} style={{marginTop: "20px"}}>
                    {componentsToDoList}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
