export const ACTIONS = {
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
};

export const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [...state, action.payload];

    case ACTIONS.UPDATE_TASK:
      return state.map(task =>
        task.id === action.payload.id ? action.payload : task
      );

    case ACTIONS.DELETE_TASK:
      return state.filter(task => task.id !== action.payload);

    case ACTIONS.TOGGLE_TASK:
      return state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );

    default:
      return state;
  }
};
