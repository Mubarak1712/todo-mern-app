import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API = 'https://todo-backend-2818.onrender.com/todos';


function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!text.trim()) return;
    const res = await axios.post(API, { text, done: false });
    setTodos([...todos, res.data]);
    setText('');
  };

  const toggleDone = async (id, done) => {
    const res = await axios.put(`${API}/${id}`, { done: !done });
    setTodos(todos.map(t => (t._id === id ? res.data : t)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    setTodos(todos.filter(t => t._id !== id));
  };

  return (
    <div className="container">
      <h1>📝 To-Do List</h1>
      <div className="form">
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Enter task" />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo._id} className={todo.done ? 'done' : ''}>
            <span onClick={() => toggleDone(todo._id, todo.done)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
