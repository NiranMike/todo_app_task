import { ADD_TODO, DELETE_TODO, EDIT_TODO, TodoType, TodoActionTypes, COMPLETE_TODO } from "./action";

// Load initial todos from local storage or use empty array
const storedTodos = localStorage.getItem('todos');
const initialTodos: TodoType[] = storedTodos ? JSON.parse(storedTodos) : [];

export const initialState = {
    todos: initialTodos
};

const todoReducer = (state = initialState, action: TodoActionTypes): { todos: TodoType[] } => {
    switch (action.type) {
        case ADD_TODO:
            const newAddTodos = [...state.todos, action.payload];
            localStorage.setItem('todos', JSON.stringify(newAddTodos));
            return { ...state, todos: newAddTodos };
        case EDIT_TODO:
            const editedTodos = state.todos.map(todo =>
                todo.id === action.payload.id ? { ...todo, text: action.payload.newText } : todo
            );
            localStorage.setItem('todos', JSON.stringify(editedTodos));
            
            return { ...state, todos: editedTodos };
        case DELETE_TODO:
            const updatedTodos = state.todos.filter(todo => todo.id !== action.payload.id);
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return { ...state, todos: updatedTodos };
        case COMPLETE_TODO:
            const completedTodos = state.todos.map(todo =>
                todo.id === action.payload.id ? { ...todo, completed: action.payload.complete } : todo
            );
            localStorage.setItem('todos', JSON.stringify(completedTodos));
            return { ...state, todos: completedTodos };
        default:
            return state;
    }
};

export default todoReducer;
