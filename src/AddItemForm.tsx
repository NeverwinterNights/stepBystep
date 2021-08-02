import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type  AddItemFormPropsType = {
    addItem: (title: string) => void
}


export const AddItemForm = (props:AddItemFormPropsType) => {

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


    return (
        <div>
            <div>
                <input value={value} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}/>
                <button onClick={addItem}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
        </div>
    );
};

