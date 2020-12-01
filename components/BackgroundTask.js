import React, {useEffect} from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"

//Gets a status of background fetch.

const LOCATION_TASK_NAME = 'background-location-task';

// RegisterBackgroundTask.then((data)=>{

//     console.log(data)
// }).catch((err)=> {
//     console.log(err)

// })

const TaskComponent = () => {

    
    return (
      <TouchableOpacity onPress={RegisterBackgroundTask} style = {{margin:60}}>
        <Text>Enable background location</Text>
      </TouchableOpacity>
    );

}

const RegisterBackgroundTask = async () => {
  try {
    await BackgroundFetch.registerTaskAsync(TASK_NAME, {
      minimumInterval: 5, // seconds,
    })
    alert("Task registered")
    return "success"
  } catch (err) {
    alert("Task Register failed:", err)
    return "fail"
  }
}



const TASK_NAME = "BACKGROUND_TASK"

TaskManager.defineTask(TASK_NAME, () => {
  try {
    // fetch data here...
    console.log("Hello")
    const receivedNewData = "Simulated fetch " + Math.random()
    console.log("My task ", receivedNewData)
    return receivedNewData
      ? BackgroundFetch.Result.NewData
      : BackgroundFetch.Result.NoData
  } catch (err) {
    console.log("Error "+err)
    return BackgroundFetch.Result.Failed
  }
})

export default TaskComponent;