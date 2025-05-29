import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {fetchTodos} from '../features/todos/todosSlice';
import TodoItem from './TodoItem';

function TodoList() {
  const dispatch=useDispatch();
  const todos=useSelector((state)=>state.todos.items);
  const todoStatus=useSelector((state)=>state.todos.status);
  const error=useSelector((state)=>state.todos.error);

  useEffect(()=>{
    if(todoStatus==='idle'){
      dispatch(fetchTodos());
    }
  },[todoStatus,dispatch])

  let content;
  if(todoStatus==='loading'){
    content=<p>Loading todos...</p>
  }else if(todoStatus==='succeeded'){
    content=(<div className="todo-list">
      {todos.map((todo)=>(
        
        <TodoItem key={todo.id} todo={todo}/>
      ))}
    </div>)
  }else if(todoStatus==='failed'){
    content=<p>Error:{error}</p>
  }
  return (
    <section>
        <h2>Your</h2>
        {content}
        
    </section>
  )
}

export default TodoList
