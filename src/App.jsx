import { useState, useEffect } from 'react';
import { TodoContextProvider } from './context/TodoContext';
import TodoForm from './component/TodoForm';
import TodoItems from './component/TodoItems';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos((todos) => [{ id: Date.now(), text, completed: false }, ...todos]);
  };

  const deleteTodo = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, text) => {
    setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  const toggleCompleted = (id) => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos && savedTodos.length > 0) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const colors = [
    'bg-pink-100 border-pink-300',
    'bg-purple-100 border-purple-300',
    'bg-indigo-100 border-indigo-300',
    'bg-yellow-100 border-yellow-300',
    'bg-green-100 border-green-300',
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 p-6">
      <div className="w-full max-w-lg bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl shadow-2xl p-6">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 text-center mb-6">
          My To-Do List
        </h1>
        <TodoContextProvider value={{ todos, addTodo, deleteTodo, updateTodo, toggleCompleted }}>
          <TodoForm />

          <ul className="space-y-4 mt-6">
            {todos.map((todo, index) => (
              <li
                key={todo.id}
                className={`p-4 rounded-xl shadow-lg border transition hover:scale-105 duration-300 ${
                  todo.completed ? 'bg-green-200 border-green-400' : colors[index % colors.length]
                }`}
              >
                <TodoItems todo={todo} />
              </li>
            ))}
          </ul>
        </TodoContextProvider>
      </div>
    </div>
  );
}

export default App;
