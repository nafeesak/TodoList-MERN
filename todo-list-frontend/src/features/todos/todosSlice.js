import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL="http://localhost:5000/api/todos"//Backend API endpoint

//Async Thunks
export const fetchTodos=createAsyncThunk('todos/fetchTodos',async ()=>{
    const response =await axios.get(API_URL);
    return response.data;
})

export const addTodo=createAsyncThunk('todos/addTodo',async (newTodo)=>{
    const response =await axios.post(API_URL,newTodo);
    return response.data;
})

export const updateTodo=createAsyncThunk('todos/updateTodo',async (updateTodo)=>{
    const response =await axios.put(`${API_URL}/${updateTodo.id}`,updateTodo);
    return response.data;
})
export const deleteTodo=createAsyncThunk('todos/deleteTodo',async (todoId)=>{
    await axios.delete(`${API_URL}/${todoId}`)
    return todoId;
})

const todosSlice=createSlice({
    name:'todos',
    initialState:{
        items:[],
        status:'idle',//idle,loading,succedded ,failed
        errror:null
    },
    reducers:{
        //no regular reducers needed for this simple crud operation as all action are async
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTodos.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchTodos.fulfilled,(state,action)=>{
              state.status='succeeded';
            state.items=action.payload;
        })
        .addCase(fetchTodos.rejected,(state,action)=>{
              state.status='failed';
            state.errror=action.error.message;
        })
        .addCase(addTodo.fulfilled,(state,action)=>{
            state.items.push(action.payload)
        })
        .addCase(updateTodo.fulfilled,(state,action)=>{
            const index=state.items.findIndex(todo=>todo.id === action.payload.id);
            if(index !=-1){
                state.items[index]=action.payload
            }
        })
        .addCase(deleteTodo.fulfilled,(state,action)=>{
            state.items=state.items.filter(todo =>todo.id !== action.payload)
        })
    }
})
export default todosSlice.reducer;