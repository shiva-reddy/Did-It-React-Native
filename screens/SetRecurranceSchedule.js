import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ConversationCard from '../components/ConversationCard';
import MyAppText from '../components/MyAppText';
import NextStepButton from '../components/NextStepButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { createTask } from '../database/Utilities/api';
import moment from 'moment'

const selectTodos = state => state.createTask

const SetTaskRecurranceSchedule = ({ route, navigation }) => {
  const taskObject = useSelector(selectTodos)
  console.log("Task name is "+JSON.stringify(taskObject))
  const { secondaryColor, tertiaryColor } = useTheme();

  const [period, setPeriod] = React.useState('month');
  const daysOfMonth = Array.from(Array(30).keys()).map((day) => {
    return { label: (day + 1).toString(), value: (day + 1).toString() };
  });

  const [dayOfMonth, setDaysOfMonth] = React.useState('1');
  const [dayOfWeek, setDayOfWeek] = React.useState('Sunday');

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ].map((day) => {
    return { label: day, value: day };
  });

  return (
    <View style={styles.container}>
      <ConversationCard avatarText="How does the task repeat?" />
      <View
        style={{
          alignSelf: 'stretch',
          flex: 6,
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}
      >
        <DropDownPicker
          items={[
            { label: 'Month', value: 'month' },
            { label: 'Week', value: 'week' },
          ]}
          defaultValue={period}
          containerStyle={{ height: 40 }}
          style={{
            backgroundColor: tertiaryColor,
            borderColor: secondaryColor,
            width: 150,
          }}
          itemStyle={{ justifyContent: 'flex-start' }}
          dropDownStyle={{
            backgroundColor: tertiaryColor,
            borderColor: secondaryColor,
          }}
          onChangeItem={(item) => setPeriod(item.value)}
          labelStyle={{
            color: secondaryColor,
            fontFamily: 'Pangolin_400Regular',
          }}
        />
        {period === 'month' ? (
          <DropDownPicker
            items={daysOfMonth}
            defaultValue={dayOfMonth}
            containerStyle={{ height: 40 }}
            style={{
              backgroundColor: tertiaryColor,
              borderColor: secondaryColor,
              width: 150,
            }}
            itemStyle={{ justifyContent: 'flex-start', color: secondaryColor }}
            dropDownStyle={{
              backgroundColor: tertiaryColor,
              borderColor: secondaryColor,
            }}
            onChangeItem={(item) => setDaysOfMonth(item.value)}
            labelStyle={{
              color: secondaryColor,
              fontFamily: 'Pangolin_400Regular',
            }}
          />
        ) : (
          <DropDownPicker
            items={daysOfWeek}
            defaultValue={dayOfWeek}
            containerStyle={{ height: 40 }}
            style={{
              backgroundColor: tertiaryColor,
              borderColor: secondaryColor,
              width: 150,
            }}
            itemStyle={{ justifyContent: 'flex-start' }}
            dropDownStyle={{
              backgroundColor: tertiaryColor,
              borderColor: secondaryColor,
            }}
            onChangeItem={(item) => setDayOfWeek(item.value)}
            labelStyle={{
              color: secondaryColor,
              fontFamily: 'Pangolin_400Regular',
            }}
          />
        )}
      </View>
      <View
        style={{
          marginRight: 25,
          marginBottom: 20,
        }}
      >
        <NextStepButton
          content="Next Step"
          action={async () => {
            // Read the values, insert into db and view tasks
            /*
              {"createTask":{"taskName":"","taskDate":{},"taskTime":"","taskCategory":"","isTaskRepeating":false,"repeatRange":""}}
                  
                  name:         {type: types.TEXT, not_null: true },
                  category:      {type: types.TEXT },
                  isCompleted:   {type: types.BOOLEAN},
                  isRecurring:   {type: types.BOOLEAN},
                  taskFinishBy : {type: types.DATETIME},
                  createdDate:   {type: types.DATE}

                  var task = {}
                  task.name=taskObject.taskName
                  task.category=taskObject.taskCategory
                  task.isCompleted = 0
                  task.isRecurring = taskObject.isRecurring ==false?0:1
                  task.taskFinishBy = moment(`${taskObject.taskDate} ${taskObject.taskTime}`, 'YYYY-MM-DD HH:mm:ss').format();
                  task.createdDate = new Date().toIsoString()
                  
            */
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

                  navigation.navigate('ViewTasks')}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#264653',
  },
});

export default SetTaskRecurranceSchedule;
