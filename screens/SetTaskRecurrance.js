import React from 'react';
import { useSelector } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ConversationCard from '../components/ConversationCard';
import MyAppText from '../components/MyAppText';
import { useTheme } from '@react-navigation/native';
import { createTask } from '../database/Utilities/api';
import moment from 'moment'
//import CalendarPicker from 'react-native-calendar-picker';
const selectTodos = state => state.createTask

const option = (text, action) => {
  const { tertiaryColor } = useTheme();

  return (
    <TouchableOpacity
      style={styles({ tertiaryColor }).button}
      onPress={() => action()}
    >
      <MyAppText>
        <Text style={styles({}).modeText}>{text}</Text>
      </MyAppText>
    </TouchableOpacity>
  );
};

const SetTaskRecurrance = ({ route, navigation }) => {
  const taskObject = useSelector(selectTodos)
  return (
    <View style={styles({}).container}>
      <ConversationCard avatarText="Does this task repeat?" />
      <View style={{ flex: 3, flexDirection: 'row' }}>
        <View style={styles({}).options}>
          {option('Yes', () => {
            navigation.navigate('SetTaskRecurranceSchedule');
          })}
          {option('No', async () => {
            //read the values and insert into db
            const task = {};
            task.name = taskObject.taskName;
            task.category = taskObject.taskCategory;
            task.isCompleted = 0;
            task.isRecurring = taskObject.isRecurring;
            // console.log("Tasktime hours "+JSON.stringify(taskObject.taskTime.hours)+ " "+JSON.stringify(taskObject.taskTime.minutes)+
            // " "+JSON.stringify(taskObject.taskTime.seconds))
            
            // convert time to seconds
            var taskTimeInSeconds  = taskObject.taskTime.hours*3600 + taskObject.taskTime.minutes*60 + taskObject.taskTime.seconds
            // Get seconds in HH:mm:ss format
            taskTimeInSeconds = moment(taskObject.taskDate).startOf('day').seconds(taskTimeInSeconds).format('HH:mm:ss');
            //console.log("Task time is "+taskTimeInSeconds)
            
            // Concat date and time
            task.taskFinishBy = moment(
              `${taskObject.taskDate} ${taskTimeInSeconds}`,
              'YYYY-MM-DD HH:mm:ss',
            ).toISOString();
            //console.log("task object "+ JSON.stringify(task))
            task.createdDate = new Date().toISOString();

            console.log('Task object is ' + JSON.stringify(task));
            await createTask(task);
                  navigation.navigate('ViewTasks');
          })}
        </View>
      </View>
    </View>
  );
};

const styles = ({ tertiaryColor, secondaryColor }) =>
  StyleSheet.create({
    icon: {
      marginTop: 20,
      marginHorizontal: 20,
    },
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#264653',
    },
    button: {
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 100,
      backgroundColor: tertiaryColor,
      borderRadius: 100,
    },
    modeText: {
      fontSize: 35,
    },
    options: {
      flex: 6,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
  });

export default SetTaskRecurrance;
