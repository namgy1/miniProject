import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

function App() {
  const [date, setDate] = useState(new Date());
  const [todos, setTodos] = useState({});
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const dateString = format(date, 'yyyy-MM-dd', { locale: ko });
      const updatedTodos = {
        ...todos,
        [dateString]: [...(todos[dateString] || []), { text: newTodo, completed: false }]
      };
      setTodos(updatedTodos);
      setNewTodo("");
    }
  };

  const toggleTodo = (date, index) => {
    const dateString = format(date, 'yyyy-MM-dd', { locale: ko });
    const updatedTodos = {
      ...todos,
      [dateString]: todos[dateString].map((todo, i) => {
        if (i === index) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    };
    setTodos(updatedTodos);
  };

  const deleteTodo = (date, index) => {
    const dateString = format(date, 'yyyy-MM-dd', { locale: ko });
    const updatedTodos = {
      ...todos,
      [dateString]: todos[dateString].filter((_, i) => i !== index)
    };
    setTodos(updatedTodos);
  };

  const getCurrentTodos = () => {
    const dateString = format(date, 'yyyy-MM-dd', { locale: ko });
    return todos[dateString] || [];
  };

  return (
    <div className="App">
      <h1 className="app-title">할 일 목록</h1>
      <div className="app-container">
        <div className="calendar-container">
          <Calendar onChange={setDate} value={date} locale="ko-KR" />
        </div>
        <div className="todo-container">
          <h2 className="todo-title">{format(date, 'PPP', { locale: ko })}의 할 일</h2>
          <div className="todo-input-container">
            <input 
              className="todo-input"
              type="text" 
              value={newTodo} 
              onChange={(e) => setNewTodo(e.target.value)} 
              placeholder="새 할 일을 추가하세요" 
            />
            <button className="add-button" onClick={addTodo}>추가</button>
          </div>
          <ul className="todo-list">
            {getCurrentTodos().map((todo, index) => (
              <li key={index} className={`todo-item ${todo.completed ? "completed" : ""}`}>
                <span className="todo-text">{todo.text}</span>
                <button className="complete-button" onClick={() => toggleTodo(date, index)}>
                  {todo.completed ? "취소" : "완료"}
                </button>
                <button className="delete-button" onClick={() => deleteTodo(date, index)}>삭제</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
