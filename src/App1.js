import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from './app/counter';
function App() {
  const counter = useSelector((state) => state.counter)
  const dispatch = useDispatch()
  console.log(counter);
  return (
    <div className="App">
     <h1>{counter}</h1>
     <div>
      <button onClick={() => dispatch(increment(4))}>increment</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>
     </div>
    </div>
  );
}

export default App;
