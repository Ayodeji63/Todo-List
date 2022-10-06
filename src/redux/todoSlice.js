import { async } from "@firebase/util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useState } from "react";
import { db } from "../firebaseConfig";
import { Query, collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useUnique } from "../Context/uniquekey";


// Create todo
export const createTodoAsync = createAsyncThunk(
    `todo/createTodoAsync`,

    async (payload) => {
        const collectionRef = collection(db, 'todos')
      await addDoc(collectionRef, {
            title:payload.title,
            completed: false,
        })
        
    }
)

//Update todo in firebase
export const toggleCompleteAsync = createAsyncThunk(
    `todo/toggleCompleteAsync`,
    async (payload) => {
        updateDoc(doc(db, 'todos', payload.id), {
            completed: payload.completed,
        })
    }
)
export const changeTodoAsync = createAsyncThunk(
    `todo/changeTodoAsync`,
    async (payload) => {
        updateDoc(doc(db, 'todos', payload.id), {
            title: payload.title
        })
    }
)

//delete todo 
export const deleteTodoAsync = async (payload) => {
    await deleteDoc(doc(db, 'todos', payload.id));
}

export const todoSlice = createSlice ({
    name: 'todos',
    initialState: [
       
    ],
    reducers: {
        addTodo:(state, action) => {
            const todo = {
                id: new Date (),
                title: action.payload.title,
                completed: false,
            };
            state.push(todo)
        },
        toggleComplete: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state[index].completed = action.payload.completed
        },
        deleteTodo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id)
        },
        updateTodo: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
             state[index].title = action.payload.title
            console.log(state[index].title);
        },
        setTodo: (state, action) => {
           return action.payload.forEach(element => {
                return state.push(element)
            });
        }
    },
    extraReducers: {
        [createTodoAsync.fulfilled]: (state,action) => {
          return action.payload.todo
        },
        [toggleCompleteAsync.fulfilled]: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state[index].completed = action.payload.todo.completed
        },
        [changeTodoAsync.fulfilled]: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state[index].title = action.payload.todo.title
        },
        [deleteTodoAsync.fulfilled]: (state,action) => {
            return state.filter((todo) => todo.id !== action.payload.id)
        } 
    }
})

export const {addTodo, toggleComplete, updateTodo, deleteTodo, setTodo} = todoSlice.actions;

export default todoSlice.reducer