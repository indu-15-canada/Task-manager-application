import React from 'react';

const Task = ({ task, onToggle, onDelete, onEdit }) => {
  const getPriorityEmoji = (priority) => {
    const emojis = { low: '🟢', medium: '🟡', high: '🔴' };
    return emojis[priority] || '⚪';
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      personal: '👤',
      work: '💼',
      shopping: '🛒',
      health: '❤️'
    };
    return emojis[category] || '📌';
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div className={`task ${task.completed ? 'completed' : ''} priority-${task.priority}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <div className="task-content">
        <div className="task-header">
          <h3>{getPriorityEmoji(task.priority)} {task.title}</h3>
          <span className="category">{getCategoryEmoji(task.category)}</span>
        </div>
        <p>{task.description}</p>
        {task.dueDate && (
          <div className={`due-date ${isOverdue ? 'overdue' : ''}`}>
            📅 Due: {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
      </div>
      <div className="task-actions">
        <button onClick={() => onEdit(task)} className="edit-button">✏️</button>
        <button onClick={() => onDelete(task.id)} className="delete-button">🗑️</button>
      </div>
    </div>
  );
};

export default React.memo(Task);
