import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import AppBar from '@material-ui/core/AppBar/AppBar';
import {IconButton, Toolbar, Typography, Button, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export  type  filteredType = "all" | "active" | "completed"
export  type  ToDoListType = {
    id: string
    title: string
    filter: filteredType
}
export  type  TaskStateType = {
    [key: string]: Array<TaskType>
}

function App () {


    const ToDoListID_1 = v1 ()
    const ToDoListID_2 = v1 ()

    const [toDoList, setToDoList] = useState<Array<ToDoListType>> ([
        {id: ToDoListID_1, title: "What to learn", filter: "all"},
        {id: ToDoListID_2, title: "What to buy", filter: "all"}
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
    const changeStatus = (taskId: string, isDone: boolean, ToDoListID: string) => {

        tasks[ToDoListID] = tasks[ToDoListID].map ((t) => t.id === taskId ? {...t, isDone} : t)


        setTasks ({...tasks})
    }
    const changeTaskTitle = (taskId: string, title: string, ToDoListID: string) => {

        tasks[ToDoListID] = tasks[ToDoListID].map ((t) => t.id === taskId ? {...t, title} : t)


        setTasks ({...tasks})
    }


    const changeToDoFilter = (filter: filteredType, ToDoListID: string) => {
        setToDoList (toDoList.map ((t) => t.id === ToDoListID ? {...t, filter} : t))

    }
    const changeToDoTitle = (title: string, ToDoListID: string) => {
        setToDoList (toDoList.map ((t) => t.id === ToDoListID ? {...t, title} : t))

    }
    const removeToDoList = (ToDoListID: string) => {
        setToDoList (toDoList.filter ((t) => t.id !== ToDoListID))
        delete tasks[ToDoListID]
    }
    const addToDoList = (title: string) => {
        const ToDoListID = v1 ()
        const newToDoList: ToDoListType = {
            id: ToDoListID, title: title, filter: "all",
        }
        setToDoList ([...toDoList, newToDoList])
        setTasks ({...tasks, [ToDoListID]: []})
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
    const componentsToDoList = toDoList.map ((t) => {
        return (
            <Grid item>
                <Paper style={{padding: "20px"}} elevation={5}>
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

export default App;
