import { compose, createStore } from 'redux';

import rootReducer from './rootReducer';
import { TodoType } from './action';

const storedTodos = localStorage.getItem('todos');
const initialTodos: TodoType[] = storedTodos ? JSON.parse(storedTodos) : [];

interface InitialState {
  todoReducer: {
    todos: TodoType[];
  };
}

const initialState: InitialState = {
  todoReducer: {
    todos: initialTodos,
  },
};



export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const store = createStore(rootReducer,initialState, composeEnhancers());


export default store;


