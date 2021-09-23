import {
    ActionType,
    AddTodolistActionCreator,
    ChangeTodolistFilterActionCreator,
    ChangeTodolistTitleActionCreator,
    RemoveTodolistActionCreator,
    toDoListsReducer
} from './toDoLists-reducer';
import {v1} from 'uuid';
import {filteredType, ToDoListType} from '../App';

let todolistId1: string;
let todolistId2: string;
let startState: Array<ToDoListType>;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {

    const endState = toDoListsReducer(startState, RemoveTodolistActionCreator(todolistId1)) /* вместо первон экшена
    указываем action type соотвествующий, его запускаем () в параметры проббрасываем удаляемый todolistId1*/

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = toDoListsReducer(startState, AddTodolistActionCreator(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        title: newTodolistTitle,
        ToDoListID: todolistId2,
    };

    const endState = toDoListsReducer(startState, ChangeTodolistTitleActionCreator(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: filteredType = "completed";

    const action: ActionType = {  /*появляются  проблемы с типизацией
        этой строчки. можно написать as const или типизировать актионс*/
        type: "CHANGE-TODOLIST-FILTER",
        filter: newFilter,
        ToDoListID: todolistId2
    };

    const endState = toDoListsReducer(startState, ChangeTodolistFilterActionCreator(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

