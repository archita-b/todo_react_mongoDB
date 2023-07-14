import { useEffect, useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { fetchTodos, createTodo, deleteTodoItem } from "./reqs";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos().then((data) => setTodos(data));
  }, []);

  function addTodo(title) {
    const timestamp = new Date(Date.now());
    const date = timestamp.toISOString().split("T")[0];

    const newTodo = {
      item: title,
      notes: "",
      priority: "none",
      duedate: date,
      completed: false,
    };
    createTodo(newTodo).then((data) => {
      setTodos((currentTodos) => {
        return [...currentTodos, { ...newTodo, ...data }];
      });
    });
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo._id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo._id !== id);
    });
  }

  return (
    <>
      <TodoForm addTodo={addTodo} />
      <h2 className="header">Todo List</h2>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
