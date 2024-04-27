import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { addTodo, deleteTodoAction, editTodo, completeTodoAction } from '../store/action';
import { ChangeEvent, useState } from 'react';
import Todo from './Todo';
import { TodoType } from '../store/action';
import toast from "react-hot-toast"

const TodoList = () => {
    const dispatch = useDispatch();
    const [inputText, setInputText] = useState<string>('');
    const todos = useSelector((state: RootState) => state.todoReducer.todos);

    const notifyAdd = () => toast("New task created");
    

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            dispatch({ type: 'SET_TODOS', payload: JSON.parse(storedTodos) });
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addNewTodo = () => {
        if (inputText.trim() === '') return;

        const newTodo: TodoType = {
            id: Date.now(),
            text: inputText.trim()

        };

        dispatch(addTodo(newTodo));
        setInputText('');
        notifyAdd();
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    }

    return (
        <div className='space-y-7'>
            <div className='flex lg:flex-row flex-col lg:items-center gap-3'>
                <div className='flex flex-1 items-center rounded-[8px] h-[50px] border-[1px] border-black'>
                    <input type="text" value={inputText} onChange={(e) => handleInputChange(e)} className='h-full py-3 outline-none placeholder:text-[#00000080] font-bold text-md bg-[#fbcf67] px-4 rounded-[6px] w-full flex-1' placeholder='Create a tasks...' />
                </div>
                <button onClick={addNewTodo} className='px-[30px] bg-[#7FBC95] py-3  border-[1px] border-black rounded-[8px] active:scale-95 font-medium duration-150 hover:border-b-[5px] hover:border-r-[2px] transition-all'>
                    New task
                </button>
            </div>
            <div className='w-full bg-black h-[1px]'></div>
            {todos?.length === 0 &&(
                <div>No Available Task</div>
            )}
            {todos?.map(todo => (
                <Todo
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    completed={todo.completed || false} 
                    editTodo={editTodo}
                    deleteTodoAction={deleteTodoAction}
                    completeTodoAction={completeTodoAction} 
                />
            ))}
        </div>
    );
};

export default TodoList;
