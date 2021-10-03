import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";


type  TaskPropsType = {
    task: TaskType
    removeTask: (id: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void
}




export const Task = React.memo( (props: TaskPropsType) => {

    const onRemoveHandler = () => {
        props.removeTask(props.task.id)
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.task.id, e.currentTarget.checked)
    }

    const changeTaskTitle = (title: string) => {
        props.changeTaskTitle(props.task.id, title)
    }



    return (
        <li key={props.task.id} className={props.task.isDone ? "is-done " : ""}>
            <Checkbox color={"primary"}
                      onChange={onChangeInputHandler}
                      checked={props.task.isDone}/>
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>

            <IconButton size={"small"} onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </li>
    );
});

