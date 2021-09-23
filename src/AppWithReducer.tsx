import React, {useReducer} from 'react';
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
    RemoveTodolistActionCreator,
    toDoListsReducer
} from "./store/toDoLists-reducer";
import {
    AddTaskActionCreator,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./store/tasks-reducer";

export  type  filteredType = "all" | "active" | "completed"
export  type  ToDoListType = {
    id: string
    title: string
    filter: filteredType
}
export  type  TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {

    const toDoListID_1 = v1()
    const toDoListID_2 = v1()

    const [toDoList, dispatchToDoList] = useReducer(toDoListsReducer, [
        {id: toDoListID_1, title: "What to learn", filter: "all"},
        {id: toDoListID_2, title: "What to buy", filter: "all"}
    ]);

    const [tasks, dispatchTask] = useReducer(tasksReducer, {
        [toDoListID_1]: [  /*ковычки из за переменной?*/
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}],
        [toDoListID_2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}]
    })

    const removeTask = (id: string, ToDoListID: string) => {
        dispatchTask(removeTaskAC(id, ToDoListID))
    }

    const addTask = (title: string, ToDoListID: string) => {
        dispatchTask(AddTaskActionCreator(title, ToDoListID))
    }

    const changeStatus = (taskId: string, isDone: boolean, ToDoListID: string) => {
        dispatchTask(changeTaskStatusAC(taskId, isDone, ToDoListID))
    }

    const changeTaskTitle = (taskId: string, title: string, ToDoListID: string) => {
        dispatchTask(changeTaskTitleAC(taskId, title, ToDoListID))
    }

    const changeToDoFilter = (filter: filteredType, ToDoListID: string) => {
        dispatchToDoList(ChangeTodolistFilterActionCreator(filter, ToDoListID))
    }

    const changeToDoTitle = (title: string, ToDoListID: string) => {
        dispatchToDoList(ChangeTodolistTitleActionCreator(title, ToDoListID))
    }

    const removeToDoList = (ToDoListID: string) => {
        let action = RemoveTodolistActionCreator(ToDoListID)
        dispatchToDoList(action)
        dispatchTask(action)
    }

    const addToDoList = (title: string) => {
        let action = AddTodolistActionCreator(title)
        dispatchToDoList(action)
        dispatchTask(action)
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

export default AppWithReducer;
