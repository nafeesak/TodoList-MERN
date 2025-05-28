import React,{use, useState} from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todosSlice';

function TodoForm() {
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const dispatch=useDispatch();

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(title.trim()){
      dispatch(addTodo({title,description}))
      setTitle('')
      setDescription('')
    }
  }
  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      <input
      type="text"
      placeholder='Add new todo title'
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      required
      />
      <textarea 
      placeholder='Description (optional)'
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      ></textarea>
      <button type='submit'>Add Todo</button>
    </form>
  )
}

export default TodoForm
