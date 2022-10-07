import React, { useEffect, useState, useMemo } from "react";
import { ImCross } from "react-icons/im";
import { BsFillPencilFill } from "react-icons/bs";
import {
  toggleComplete,
  deleteTodo,
  updateTodo,
  setTodo,
  deleteTodoAsync,
} from "../redux/todoSlice";
import { useDispatch } from "react-redux";
import { toggleCompleteAsync, changeTodoAsync } from "../redux/todoSlice";


const TodoItem = ({ title, completed, id, input, setInput }) => {
  const dispatch = useDispatch();

  const handleComplete = () => {
    dispatch(toggleCompleteAsync({ id, completed: !completed }));
  };
  const handleDelete = () => {
    dispatch(deleteTodoAsync({ id }));
  };

  const updateTodo = () => {
    setInput(title);
    dispatch(changeTodoAsync({id, title:input}))
  };
 
 

  return (
    <div className="Todo__item__div">
      <div onClick={handleComplete}>
        {completed ? (
          <img src="./todo_icon.JPG" className="check" />
        ) : (
          <span className="checkbox"></span>
        )}
      </div>
      <div className="item">
        <p className={`${completed && "line-through"}`}>{title}</p>
        <div className="icons">
          <BsFillPencilFill
            className="hover:text-[#3a7bfd]"
            onClick={updateTodo}
          />
          <ImCross
            className="ml-4 hover:text-[#3a7bfd]"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};


export default TodoItem;
