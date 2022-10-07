import { async } from "@firebase/util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebaseConfig";
import { Query, collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

// Create todo
let todo = 'todos'
export const createTodoAsync = createAsyncThunk(
    `todo/createTodoAsync`,
    async (payload) => {
        const collectionRef = collection(db, todo)
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
    initialState: [],
    reducers: {
        setTodo: (state, action) => {
        return state = action.payload
        },
        allTodo:(state, action) => {
            console.log(state);
        },
        activeTodo:(state, action) => {
          return state.filter((todo) => todo.completed !== true) 
        },
        completeTodo:(state, action) => {
            return state.filter((todo) => todo.completed == true)
        },

    },
    extraReducers: {
        // [createTodoAsync.fulfilled]: (state, action) => {
        //   return action.payload.todos;  
        // },
        // [toggleCompleteAsync.fulfilled]: (state, action) => {
        //     const index = state.findIndex((todo) => todo.id === action.payload.id);
        //     state[index].completed = action.payload.todo.completed
        // },
        // [changeTodoAsync.fulfilled]: (state, action) => {
        //     const index = state.findIndex((todo) => todo.id === action.payload.id);
        //     state[index].title = action.payload.todo.title
        // },
        // [deleteTodoAsync.fulfilled]: (state,action) => {
        //     return state.filter((todo) => todo.id !== action.payload.id)
        // } 
    }
})

export const {allTodo, activeTodo, completeTodo, setTodo} = todoSlice.actions;

export default todoSlice.reducer