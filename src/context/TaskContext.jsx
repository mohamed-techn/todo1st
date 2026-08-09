import { createContext, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { getTodayForInput } from "../components/tasks/dateHelpers";

export const TaskContext = createContext();

// const initTodos = [
//   {
//     id: uuidv4(),
//     title: "My First Task",
//     priority: "Medium",
//     dueDate: "2026-08-05",
//     category: "Work",
//     isCompleted: false,
//   },
// ];

const initTodos = [];

export default function TaskProvider({ children }) {
  const [task, setTask] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("tasks"));
      return Array.isArray(stored) ? stored : initTodos;
    } catch {
      return initTodos;
    }
  });

  const [input, setInput] = useState({
    title: "",
    priority: "None",
    dueDate: getTodayForInput(),
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==== Add Function ====
  function handleAddTask() {
    const newTask = {
      id: uuidv4(),
      ...input,
      isCompleted: false,
    };
    setTask((prev) => {
      const updatedTasks = [...prev, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    // Clear the fields
    setInput({
      title: "",
      priority: "None",
      dueDate: getTodayForInput(),
      category: "",
    });
  }
  // ### Add Function ###

  // ==== Delete Function ====
  function handleDeleteTask(taskId) {
    setTask((prev) => {
      const updatedTasks = prev.filter((t) => taskId !== t.id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  }
  // ### Delete Function ###

  // ==== Edit Function ====
  function handleEditTask(id, updatedFields) {
    setTask((prev) => {
      const updatedTasks = prev.map((t) =>
        t.id === id ? { ...t, ...updatedFields } : t,
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  }
  // ### Edit Function ###

  // ==== Chack Function ====
  function handleCheckTask(id) {
    setTask((prev) => {
      const updated = prev.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t,
      );
      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    });
  }
  // ### Check it Function ###

  // ==== Clear Completed Function ====
  function handleClearCompleted() {
    setTask((prev) => {
      const updated = prev.filter((t) => !t.isCompleted);
      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    });
  }
  // ### Clear Completed Function ###

  const value = useMemo(
    () => ({
      task,
      setTask,
      input,
      handleChange,
      handleAddTask,
      handleDeleteTask,
      handleEditTask,
      handleCheckTask,
      handleClearCompleted,
    }),
    [task, input],
  );

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )
}
