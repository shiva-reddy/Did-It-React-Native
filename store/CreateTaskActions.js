export const createTask = (taskObject) => ({
  type: 'CREATE_TASK',
  payload: taskObject,
});

export const addTaskName = (taskObject) => ({
  type: 'ADD_TASK_NAME',
  payload: taskObject.taskName,
});

export const addTaskCategory = (taskObject) => ({
  type: 'ADD_TASK_CATEGORY',
  payload: taskObject.taskCategory,
});

export const addTaskDate = (taskObject) => ({
  type: 'ADD_TASK_DATE',
  payload: taskObject.taskDate,
});

export const addTaskTime = (taskObject) => ({
  type: 'ADD_TASK_TIME',
  payload: taskObject.taskTime,
});
