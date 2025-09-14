import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';

function TodoItems({ todo }) {
  const { deleteTodo, toggleCompleted, updateTodo } = useTodo();
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleUpdate = () => {
    if (text.trim() === '') return;
    updateTodo(todo.id, text);
    setIsTodoEditable(false);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Left Side: Checkbox + Text */}
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleCompleted(todo.id)}
          className="w-5 h-5 accent-pink-500 cursor-pointer transition-transform hover:scale-110"
        />

        <input
          type="text"
          readOnly={!isTodoEditable}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`flex-1 text-lg font-medium bg-transparent border-b focus:outline-none transition-all duration-300 ${
            todo.completed
              ? 'line-through text-gray-500'
              : 'text-gray-800'
          } ${isTodoEditable ? 'border-pink-400' : 'border-transparent'}`}
        />
      </div>

      {/* Right Side: Buttons */}
      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition disabled:opacity-50"
          onClick={() => {
            if (todo.completed) return;
            if (isTodoEditable) {
              handleUpdate();
            } else setIsTodoEditable((prev) => !prev);
          }}
          disabled={todo.completed}
        >
          {isTodoEditable ? '✔' : '✏️'}
        </button>

        <button
          onClick={handleDelete}
          className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
        >
          ✖
        </button>
      </div>
    </div>
  );
}

export default TodoItems;
