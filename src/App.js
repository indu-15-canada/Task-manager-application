import React, { useReducer, useEffect, useState, useCallback } from 'react';
// import TaskForm from '';
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList';
import './App.css';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { taskReducer, ACTIONS } from './reducers/taskReducer';

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}

function AppContent() {
  const { isDarkMode } = useTheme();
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editTask, setEditTask] = useState(null);
  const [notification, setNotification] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    if (tasks.length > 0) {
      setNotification('Tasks saved successfully!');
      const timer = setTimeout(() => setNotification(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [tasks]);

  const showNotification = useCallback((message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 2000);
  }, []);

  const addTask = useCallback((newTask) => {
    dispatch({ type: ACTIONS.ADD_TASK, payload: newTask });
    showNotification('Task added successfully!');
  }, [showNotification]);

  const toggleTask = useCallback((taskId) => {
    dispatch({ type: ACTIONS.TOGGLE_TASK, payload: taskId });
  }, []);

  const deleteTask = useCallback((taskId) => {
    dispatch({ type: ACTIONS.DELETE_TASK, payload: taskId });
    showNotification('Task deleted successfully!');
  }, [showNotification]);

  const updateTask = useCallback((updatedTask) => {
    dispatch({ type: ACTIONS.UPDATE_TASK, payload: updatedTask });
    setEditTask(null);
    showNotification('Task updated successfully!');
  }, [showNotification]);

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="app-header">
        <h1>Task Manager</h1>
        <ThemeToggle />
      </div>
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
      <TaskForm 
        onAddTask={addTask} 
        editTask={editTask}
        onUpdateTask={updateTask}
      />
      <div className="filter-controls">
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">📋 All Tasks</option>
          <option value="active">🔵 Active</option>
          <option value="completed">✅ Completed</option>
        </select>
      </div>
      <TaskList
        tasks={tasks}
        filter={filter}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={setEditTask}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
