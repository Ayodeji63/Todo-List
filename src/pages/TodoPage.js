import React, { useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AiFillSetting, AiOutlinePlus } from "react-icons/ai";
import TodoItem from "../components/TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setTodo } from "../redux/todoSlice";
import { createTodoAsync } from "../redux/todoSlice";
import {
  collection,
  onSnapshot,
  query,
  querySnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useUnique } from "../Context/uniquekey";
import { async } from "@firebase/util";

const TodoPage = () => {
  const [count, setCount] = useState([]);
  const [input, setInput] = useState("");
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todose);

  console.log(useUnique());
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/sign");
    } catch (e) {
      alert(e.message);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit =async (e) => {
    e.preventDefault();
    if (input) {
      dispatch(
       await createTodoAsync({
          title: input,
        })
      );
      setInput("");
    }
  };
  //Create todo

  //Read todo


  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = 
        onSnapshot(q, (querySnapshot) => {
          let todosArr = [];
          querySnapshot.forEach((doc) => {
            todosArr.push({ ...doc.data(), id: doc.id });
          });
         dispatch( setTodo(todosArr))
        });
    
    return () => unsubscribe();
  }, []);

  

  // delete todo
  return (
    <section className=" Todo__page__wrapper">

      <div className="TodoPage__header z-[1] sticky">
        <h1>UltiToDo</h1>
        <p>
          <AiFillSetting size={30} className=" cursor-pointer" />
        </p>
      </div>

      <div className="Todo__list z-[1] sticky">
        <form className="dark" onSubmit={onSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            className="Todo__input dark"
            placeholder="Add a todo"
          />
          <button>
            <AiOutlinePlus size={30} className="plus" />
          </button>
        </form>
        
      <div className="dark Todo__items ">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            input={input}
            setInput={setInput}
          />
        ))}
        <div className="bottom__actions">
          <p>5 items left</p>
          <ul>
            <li>All</li>
            <li>Active</li>
            <li>Completed</li>
          </ul>

          <p>Clear Completed</p>
        </div>
      </div>
      </div>

      <img
        src="./todo-app-main/images/bg-desktop-dark.jpg"
        className="h-[250px] w-full img"
        alt=""
      />

    </section>
  );
};

export default TodoPage;
