import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';

function TodoForm() {
  const [input, setInput] = useState('');
  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addTodo(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add something awesome..."
        className="flex-1 px-4 py-3 rounded-xl border-2 border-pink-400 bg-pink-50 text-gray-700 placeholder-gray-400 focus:ring-4 focus:ring-pink-300 outline-none shadow-md"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transform transition duration-300 shadow-lg"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
