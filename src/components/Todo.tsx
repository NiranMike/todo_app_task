import { FaRegTrashAlt } from 'react-icons/fa'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { IoCheckmarkDoneSharp } from "react-icons/io5";

import { completeTodoAction, deleteTodoAction, editTodo } from '../store/action';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import toast from "react-hot-toast"
  interface TodoType {
    id: number;
    text: string;
    editTodo: typeof editTodo;
    deleteTodoAction: typeof deleteTodoAction;
    completeTodoAction: typeof completeTodoAction;
    completed: boolean;
    createdDate: string | undefined;
  }
const Todo = ({ text, editTodo, deleteTodoAction,completeTodoAction, id, completed, createdDate }: TodoType) => {
  
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(text);
  const notifyDelete = () => toast("Task Deleted",{icon:<FaRegTrashAlt className='text-red-500' />, duration:1000});
  const notifySave = () => toast("Saved Changes 📝", {duration:1000});
  const notifyComplete = () => toast("Task Completed \nGood work 👍🏼", {duration:1000});

  const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        dispatch(editTodo(id, editedText));
        setIsEditing(false);
        notifySave();
    };

    const handleCancelEdit = () => {
        setEditedText(text);
        setIsEditing(false);
    };

    const handleDelete = () => {
        dispatch(deleteTodoAction(id));
        notifyDelete();
    };

    const handleToggleComplete = () => {
        dispatch(completeTodoAction(!completed, id));
        if (completed === false)
            notifyComplete();
    };

    return (
        <>
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
        <p>{createdDate}</p>
        </>
    );
};

export default Todo;