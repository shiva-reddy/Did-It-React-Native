const getTaskBasedOnCategoryQuery = () =>{

    var query = {
      columns: 'id, name, category, isCompleted, isRecurring',
      where: {
        category_eq: ""
      },
    };
    return query;
}

// Upcoming tasks, tasks whose due date is after current system time.

const getCompletedTasks = () =>{

  var query = {
    columns: 'id, name, category, isCompleted, isRecurring',
    where: {
      isCompleted_eq: true,
      
    },
  };
  return query;
}

const getPendingTasks = () =>{

  var query = {
    columns: 'id, name, category, isCompleted, isRecurring',
    where: {
      isCompleted_eq: false
    },
  };
  return query;
}

const getTasks = () =>{

  var query = {
    columns: 'id, name, category, isCompleted, isRecurring',
    where: {
      isCompleted_eq: false
    },
  };
  return query;
}

export { getTaskBasedOnCategoryQuery}