# React Task Manager

A modern task management application built with React Hooks, featuring a clean UI and powerful functionality.

## Features

- ✨ Create, edit, and delete tasks
- 🎯 Set task priorities (Low, Medium, High)
- 📋 Categorize tasks (Personal, Work, Shopping, Health)
- 📅 Set due dates for tasks
- ✅ Mark tasks as completed
- 🔍 Filter tasks by status
- 🌓 Dark/Light theme support
- 💾 Automatic data persistence
- 📱 Responsive design

## Technologies Used

- React (with Hooks)
- LocalStorage for data persistence
- CSS for styling

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
cd task-manager-app
npm install
```

3. Start the development server:
```bash
npm start
```

## React Hooks Used

- `useState` - State management
- `useEffect` - Side effects and localStorage
- `useContext` - Theme management
- `useReducer` - Task state management
- `useRef` - Input focus management
- `useMemo` - Performance optimization
- `useCallback` - Function memoization

## Project Structure

```
src/
├── components/
│   ├── Task.js
│   ├── TaskForm.js
│   └── TaskList.js
├── contexts/
│   └── ThemeContext.js
├── reducers/
│   └── taskReducer.js
├── App.js
└── App.css
```

## Features in Detail

### Task Management
- Add tasks with title, description, priority, and category
- Edit existing tasks
- Delete tasks
- Mark tasks as complete/incomplete

### Task Organization
- Priority levels (Low, Medium, High)
- Categories (Personal, Work, Shopping, Health)
- Due date tracking
- Status filtering

### User Experience
- Dark/Light theme toggle
- Automatic data saving
- Form input auto-focus
- Success notifications
- Smooth animations

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License
