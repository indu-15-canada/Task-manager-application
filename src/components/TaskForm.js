import React, { useState, useEffect, useRef } from 'react';

const TaskForm = ({ onAddTask, editTask, onUpdateTask }) => {
  const titleInputRef = useRef(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('personal');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setPriority(editTask.priority);
      setCategory(editTask.category);
      setDueDate(editTask.dueDate);
    }
  }, [editTask]);

  // Effect for initial mount focus
  useEffect(() => {
    titleInputRef.current?.focus();
  }, []); // Empty dependency array means this runs once on mount

  // Effect for focus when editing
  useEffect(() => {
    if (editTask) {
      titleInputRef.current?.focus();
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = {
      title,
      description,
      priority,
      category,
      dueDate,
      completed: editTask ? editTask.completed : false,
    };

    if (editTask) {
      onUpdateTask({ ...taskData, id: editTask.id });
    } else {
      onAddTask({ ...taskData, id: Date.now(), createdAt: new Date().toISOString() });
    }

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('personal');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className={`task-form ${editTask ? 'editing' : ''}`}>
      <input
        ref={titleInputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="✍️ Task Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="📝 Task Description"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">🟢 Low Priority</option>
        <option value="medium">🟡 Medium Priority</option>
        <option value="high">🔴 High Priority</option>
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="personal">👤 Personal</option>
        <option value="work">💼 Work</option>
        <option value="shopping">🛒 Shopping</option>
        <option value="health">❤️ Health</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">
        {editTask ? '✏️ Update Task' : 'Add Task ✨'}
      </button>
      {editTask && (
        <button 
          type="button" 
          onClick={() => onUpdateTask(null)} 
          className="cancel-button"
        >
          ❌ Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;
