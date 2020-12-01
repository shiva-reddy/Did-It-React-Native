import Task  from '../Models/Task';

function createTask(task={}) {

    return Task.createTask(task)
}

function getUpcomingTasks(category='%'){
    return Task.getUpComingTasks(category)
}


function getCompletedTasks(category='%'){
   
   return Task.getCompletedTasks(category)
}

// TBD: Can be removed if not required before final release

// const getTasksBasedOnCategories = (category) => {
  
//        return new Promise(async (resolve,reject) => {
//             var query = getTaskBasedOnCategoryQuery();
//             query["where"]["category_eq"] = category;
//             console.log(JSON.stringify(query))
//             let result1 = await Task.query(query)
//             resolve(result1)
//             return
//        });
      
// }

function deleteTask(taskId=0) {

    return  Task.deleteTask(taskId)
}

function markTaskAsDone(taskId=0, props={}) {
    
    return Task.markTaskAsDone(taskId)
}

function reScheduleTask(taskId='0', taskFinishBy='') {
    return Task.reScheduleTask(taskId, taskFinishBy)
}

function updateTaskName(taskId='0', name='') {
    return Task.updateTaskName(taskId,name)
}

function checkTableExists(tableName = ''){
    return Task.checkTableExists(tableName)
}

export { markTaskAsDone, 
         deleteTask, 
         createTask, 
         getCompletedTasks, 
         getUpcomingTasks, 
         reScheduleTask, 
         updateTaskName,checkTableExists };
    