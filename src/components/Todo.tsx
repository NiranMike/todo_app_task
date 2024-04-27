import { FaRegTrashAlt } from 'react-icons/fa'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { IoCheckmarkDoneSharp } from "react-icons/io5";

import { completeTodoAction, deleteTodoAction, editTodo } from '../store/action';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

  interface TodoType {
    id: number;
    text: string;
    editTodo: typeof editTodo;
    deleteTodoAction: typeof deleteTodoAction;
    completeTodoAction: typeof completeTodoAction;
    completed: boolean
  }
const Todo = ({ text, editTodo, deleteTodoAction,completeTodoAction, id, completed }: TodoType) => {
  
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        dispatch(editTodo(id, editedText));
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditedText(text);
        setIsEditing(false);
    };

    const handleDelete = () => {
        dispatch(deleteTodoAction(id));
    };

    const handleToggleComplete = () => {
        dispatch(completeTodoAction( !completed, id));
    };

    return (
        <div className='p-3 flex lg:flex-row flex-col lg:justify-between gap-2 lg:items-center bg-[#B380DA] border-[1px] cursor-pointer border-black rounded-[12px] hover:border-b-[6px] transition-all'>
            {isEditing ? (
                <input
                    type='text'
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    autoFocus
                    onFocus={(e) => e.target.select()}
                    onBlur={handleSaveEdit}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSaveEdit();
                        } else if (e.key === 'Escape') {
                            handleCancelEdit();
                        }
                    }}
                    className='font-bold outline-none w-full bg-transparent'
                />
            ) : (
                <p className={`font-medium max-w-[400px] ${completed ? 'line-through' : ''}`}>{text}</p>
            )}
            <div className='flex gap-2 items-center'>
                <div
                    className={`p-2 border border-black rounded-lg hover:border-b-4 transition-all duration-150 active:scale-90 ${completed ? 'text-black-500 bg-yellow-400' : 'text-black-400'}`}
                    onClick={handleToggleComplete}
                >
                    {completed ? <IoCheckmarkDoneSharp className='font-bold lg:text-[1.2rem] text-[1rem]'  /> : <IoCheckmarkCircleOutline className='font-bold' />}
                </div>
                <div
                    className='p-2 border border-black bg-[#7FBC95] rounded-lg hover:border-b-4 transition-all duration-150 active:scale-90'
                    onClick={isEditing ? handleSaveEdit : handleEdit}
                >
                    {isEditing ? <IoCheckmarkCircleOutline className='font-bold lg:text-[1.2rem] text-[1rem]'  /> : <MdOutlineModeEditOutline className='font-bold' />}
                </div>
                <div
                    className='p-2 border border-black bg-red-500 rounded-lg hover:border-b-4 transition-all duration-150 active:scale-90'
                    onClick={handleDelete}
                >
                    <FaRegTrashAlt className='font-bold lg:text-[1.2rem] text-[1rem]'  />
                </div>
            </div>
        </div>
    );
};

export default Todo;