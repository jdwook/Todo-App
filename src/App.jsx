import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", completed: false },
    { id: 1, content: "코딩 공부하기", completed: false },
    { id: 2, content: "잠 자기", completed: false },
  ]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📝 My Todo App</h1>
      </header>

      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="todo-input">
      <input
        className="input-field"
        placeholder="할 일을 입력하세요..."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        className="add-btn"
        onClick={() => {
          if (!inputValue.trim()) return;
          const newTodo = {
            id: Number(new Date()),
            content: inputValue,
            completed: false,
          };
          setTodoList([...todoList, newTodo]);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul className="todo-list">
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(todo.content);

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() =>
          setTodoList((prev) =>
            prev.map((el) =>
              el.id === todo.id ? { ...el, completed: !el.completed } : el
            )
          )
        }
      />

      {isEditing ? (
        <input
          className="edit-input"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      ) : (
        <span>{todo.content}</span>
      )}

      {isEditing ? (
        <button
          className="save-btn"
          onClick={() => {
            setTodoList((prev) =>
              prev.map((el) =>
                el.id === todo.id ? { ...el, content: inputValue } : el
              )
            );
            setIsEditing(false);
          }}
        >
          저장
        </button>
      ) : (
        <button className="edit-btn" onClick={() => setIsEditing(true)}>
          수정
        </button>
      )}

      <button
        className="delete-btn"
        onClick={() => {
          setTodoList((prev) => prev.filter((el) => el.id !== todo.id));
        }}
      >
        삭제
      </button>
    </li>
  );
}

export default App;
