import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {updateTodo,deleteTodo} from '../features/todos/todosSlice'

function TodoItem({todo}) {
  const [isEditing,setIsEditing]=useState(false);
  const [editedTitle,setEditedTitle]=useState(todo.title);
  const [editedDescription,setEditedDescription]=useState(todo.description ||"");
  const dispatch=useDispatch();

  const handleToggleComplete=()=>{
    dispatch(updateTodo({...todo,completed:!todo.completed}))
  }
  const handleDelete=()=>{
    dispatch(deleteTodo(todo.id))
  }
  const handleEdit=()=>{
    setIsEditing(true)
  }
  const handleSave=()=>{
    dispatch(updateTodo({
      ...todo,
      title:editedTitle,
      description:editedDescription,
    }))
    setIsEditing(false)
  }
  const handleCancelEdit=()=>{
    setIsEditing(false);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description||"")
  }
  return (
    
    <div className={`todo-item ${todo.completed ? 'completed':""}`}>
      
      {isEditing?(
        <div className='todo-item-edit-form'>
          <input 
          type='text'
          value={editedTitle}
          onChange={(e)=>setEditedTitle(e.target.value)}
          />
          <textarea 
      value={editedDescription}
      onChange={(e)=>setEditedDescription(e.target.value)}
      ></textarea>
      <button onClick={handleSave} type='submit'>Save</button>
      <button onClick={handleCancelEdit} type='submit'>Cancel</button>

        </div>
      ):(
        <>
        <div className='todo-item-details'>
          <h3>{todo.title}</h3>
          {todo.description && <p>{todo.description}</p>}
          <small>Status:{todo.completed ?'Compleetd' :'Pending'}</small>
        </div>
        <div className='todo-item-actions'>
          <button onClick={handleToggleComplete}>
            {todo.completed?'Mark Pending':'Mark Completed'}
          </button>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete} className='delete-button'>Delete</button>
        </div>
        </>
      )}
      
    </div>
  )
}

export default TodoItem
