import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
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

    // const toDoListID_1 = v1()
    // const toDoListID_2 = v1()

    let toDoList = useSelector<AppRootStateType, Array<ToDoListType>>(state => state.toDoList)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    let dispatch = useDispatch()


    const removeTask = useCallback ((id: string, ToDoListID: string) => {
        dispatch(removeTaskAC(id, ToDoListID))
    }, [dispatch])

    const addTask = useCallback ((title: string, ToDoListID: string) => {
        dispatch(AddTaskActionCreator(title, ToDoListID))
    }, [dispatch])

    const changeStatus = useCallback ( (taskId: string, isDone: boolean, ToDoListID: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, ToDoListID))
    }, [dispatch])

    const changeTaskTitle = useCallback ( (taskId: string, title: string, ToDoListID: string) => {
        dispatch(changeTaskTitleAC(taskId, title, ToDoListID))
    }, [dispatch])

    const changeToDoFilter = useCallback ( (filter: filteredType, ToDoListID: string) => {
        dispatch(ChangeTodolistFilterActionCreator(filter, ToDoListID))
    }, [dispatch])

    const changeToDoTitle = useCallback ( (title: string, ToDoListID: string) => {
        dispatch(ChangeTodolistTitleActionCreator(title, ToDoListID))
    }, [dispatch])

    const removeToDoList = useCallback ( (ToDoListID: string) => {
        let action = RemoveTodolistActionCreator(ToDoListID)
        dispatch(action)
    }, [dispatch])

    const addToDoList = useCallback( (title: string) => {
        let action = AddTodolistActionCreator(title)
        dispatch(action)
    }, [dispatch]);



    const componentsToDoList = toDoList.map((t) => {
        return (
            <Grid item key={t.id}>
                <Paper style={{padding: "20px"}} elevation={5}>
                    <Todolist
                        key={t.id}
                        id={t.id}
                        title={t.title}
                        tasks={tasks[t.id]}
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
