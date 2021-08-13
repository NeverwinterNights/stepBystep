import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type  EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void

}


export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean> (false);
    const [title, setTitle] = useState<string> (props.title);

    const onEditMode = () => {
        setEditMode (true)
    }
    const offEditMode = () => {
        setEditMode (false)
        props.changeTitle (title)
    }


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle (e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            offEditMode ()
        }
    }


    return (
        editMode ? <TextField onKeyPress={onKeyPressHandler} onChange={onChangeHandler} value={title} autoFocus={true}
                          onBlur={offEditMode}/> : <span onDoubleClick={onEditMode}>{props.title}</span>

    );
};

