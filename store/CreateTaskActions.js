export const createTask = (taskObject) => ({
  type: 'CREATE_TASK',
  payload: taskObject,
});

export const addTaskDate = (taskObject) => ({
  type: 'ADD_TASK_DATE',
  payload: taskObject.taskDate,
});

export const addTaskName = (taskObject) => ({
  type: 'ADD_TASK_NAME',
  payload: taskObject.taskName,
});

export const addTaskCategory = (taskObject) => ({
  type: 'ADD_TASK_CATEGORY',
  payload: taskObject.taskCategory,
});

export const addMode = (taskObject) => ({
  type: 'ADD_MODE',
  payload: taskObject.mode,
});

export const addTaskTime = (taskObject) => ({
  type: 'ADD_TASK_TIME',
  payload: taskObject.taskTime,
});

export const setTaskRepeating = (taskObject) => ({
  type: 'SET_TASK_RECURRENCE',
  payload: taskObject.isRecurring,
});
