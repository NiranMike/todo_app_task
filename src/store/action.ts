export const ADD_TODO = "ADD_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";


export interface TodoType{
    id: number;
    text: string;
    completed?: boolean;
    createdDate?: string | undefined;
}

export interface TodoState {
  todos: TodoType[];
}

export interface RootState {
  todos: TodoState;
}

export interface AddTodoAction{
    type: typeof ADD_TODO;
    payload: TodoType
}

export interface EditTodoAction{
    type: typeof EDIT_TODO;
    payload: { id: number; newText: string; }
}

export interface DeleteTodoAction{
    type: typeof DELETE_TODO;
    payload: { id: number }
}

export interface CompleteTodoAction{
    type: typeof COMPLETE_TODO;
    payload: { complete: boolean, id: number }
}

export type TodoActionTypes =(
    AddTodoAction |
    EditTodoAction |
    DeleteTodoAction |
    CompleteTodoAction
);

export const addTodo = (todo: TodoType): AddTodoAction => ({
    type: ADD_TODO,
    payload: todo
})

export const editTodo = (id: number, newText: string): EditTodoAction => ({
    type: EDIT_TODO,
    payload: { id, newText}
})

export const deleteTodoAction = (id: number) => ({
    type: DELETE_TODO,
    payload: { id }
})

export const completeTodoAction = (complete: boolean, id: number) => ({
    type: COMPLETE_TODO,
    payload: { complete, id }
})