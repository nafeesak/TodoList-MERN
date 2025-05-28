import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {updateTodo,deleteTodo} from '../features/todos/todosSlice'

function TodoItem() {
  const [isEditing,setIsEditing]=useState(false);
  const [editedTitle,setEditedTitle]=useState(todo.title)
  return (
    <div>
      
    </div>
  )
}

export default TodoItem
