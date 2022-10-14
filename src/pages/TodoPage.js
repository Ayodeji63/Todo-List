import React, { useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AiFillSetting, AiOutlinePlus } from "react-icons/ai";
import TodoItem from "../components/TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { createTodoAsync, deleteTodoAsync } from "../redux/todoSlice";
import {
  addDoc,
  collection,
  deleteDoc, 
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { doc } from "firebase/firestore";
import { useConxt } from "../Context/Context";

const TodoPage = () => {
  const [todoItems, setTodoItems] = useState([])
  const [length, setLength] = useState(0)
  const [input, setInput] = useState("");
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

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

  //Create todo
  const onSubmit = async (e) => {
    e.preventDefault();
    setInput('')
    if (input) {
      const collectionRef = collection(db, 'todos')
      await addDoc(collectionRef, {
        title:input,
        completed:false
      });
    }
  };

  //Read todo
  const q = query(collection(db, 'todos'));
  useEffect(() => {
    let todosArr = [];
    const unsubscribe = 
        onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            todosArr.push({ ...doc.data(), id: doc.id });
          });
          setTodoItems(todosArr)
          setLength(todosArr.filter(todo => todo.completed === false).length)
          todosArr = [];
        });
    return () => unsubscribe();
  }, []);

console.log(todoItems);
 
  const getActiveData = (param) => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let activeArr = [];
      querySnapshot.forEach((doc) => {
        activeArr.push({...doc.data(), id:doc.id});
      })
      if (param == 'active') {
        let retActive = activeArr.filter((todo) => todo.completed == false);
        setTodoItems(retActive)
      } else if (param == 'complete') {
        let retComplete = activeArr.filter(todo => todo.completed == true)
        setTodoItems(retComplete)
      } else {
        setTodoItems(activeArr)
      }
    })
  }

  const clearCompleted = () => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let activeArr = [];
      querySnapshot.forEach((doc) => {
        activeArr.push({...doc.data(), id:doc.id});
      })
      activeArr.forEach(async el => {
        if (el.completed == true) {
          await deleteDoc(doc(db, 'todos', el.id))
          alert("Completed cleared")
        }
      })
    })
  }


  return (
    <section className=" Todo__page__wrapper">
      

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
          {todoItems.map((todo) => (
      <TodoItem
        key={todo.id}
        id={todo.id}
        title={todo.title}
        completed={todo.completed}
        input={input}
        setInput={setInput}
      /> ))}

          {todoItems.length > 0 && <div className="bottom__actions">
            <p>{length} items left</p>
            <ul>
              <li onClick={() => getActiveData()}>All</li>
              <li onClick={() => getActiveData('active')}>Active</li>
              <li onClick={() => getActiveData('complete')}>Completed</li>
            </ul>

            <p onClick={clearCompleted}>Clear Completed</p>
          </div>  }

        </div>
      </div>

      
    </section>
  );
};

export default TodoPage;
