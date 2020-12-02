import { combineReducers } from 'redux';

const INITIAL_STATE = {
  taskName: '',
  taskDate: {},
  taskTime: '',
  taskCategory: '',
  isTaskRepeating: false,
  repeatRange: '',
  mode: '',
  isRecurring:0,
};

const createTaskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CREATE_TASK':
      return {
        ...state,
      };
    case 'ADD_TASK_NAME':
      return { ...state, taskName: action.payload };
    case 'ADD_TASK_CATEGORY':
      return { ...state, taskCategory: action.payload };
    case 'ADD_MODE':
      return { ...state, mode: action.payload };
    case 'ADD_TASK_DATE':
      return { ...state, taskDate: action.payload };
    case 'ADD_TASK_TIME':
      return { ...state, taskTime: action.payload };
    case 'SET_TASK_RECURRENCE':
      return { ...state, isTaskRepeating: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  createTask: createTaskReducer,
});
