import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { IconButton, TextField} from "@material-ui/core";
import {AddCircle} from "@material-ui/icons";


type  AddItemFormPropsType = {
    addItem: (title: string) => void
}


export const AddItemForm = (props: AddItemFormPropsType) => {

    const [value, setValue] = useState ("");
    const [error, setError] = useState ("");


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue (e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError ("")
        if (e.charCode === 13) {
            props.addItem (value)
            setValue ("")
        }
    }
    const addItem = () => {
        if (value.trim () === "") {
            setError ("Title is required")
            return
        }
        props.addItem (value.trim ())
        setValue ("")
    }
    const errorMessage = "Title is required"

    return (
        <div>
            <div style={{display: "flex", alignItems: "center"}}>
                <TextField size={"small"} helperText={error && errorMessage} variant={"outlined"} label={"Type value"}
                           value={value} onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           error={!!error}/>
                <IconButton onClick={addItem} color={"primary"}><AddCircle/></IconButton>

            </div>
        </div>
    );
};

