import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ConversationCard from '../components/ConversationCard';
import MyAppText from '../components/MyAppText';
import NextStepButton from '../components/NextStepButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { createTask } from '../database/Utilities/api';
import { CommonActions } from '@react-navigation/native';
import { markTaskAsDone } from '../database/Utilities/api';
import moment from 'moment';
import TaskCreatedModal from '../components/TaskCreatedModal';

const selectTodos = (state) => state.createTask;

function pad(num) {
  return ('0' + num).slice(-2);
}

moment.addRealMonth = function addRealMonth(d) {
  var fm = moment(d).add(1, 'M');
  var fmEnd = moment(fm).endOf('month');
  return d.date() != fm.date() && fm.isSame(fmEnd.format('YYYY-MM-DD'))
    ? fm.add(1, 'd')
    : fm;
};

const SetTaskRecurranceSchedule = ({ route, navigation }) => {
  const taskObject = useSelector(selectTodos);
  console.log('Task object is ' + JSON.stringify(taskObject));
  const { secondaryColor, tertiaryColor } = useTheme();

  const [period, setPeriod] = React.useState('month');
  const daysOfMonth = Array.from(Array(30).keys()).map((day) => {
    return { label: (day + 1).toString(), value: (day + 1).toString() };
  });

  const [dayOfMonth, setDaysOfMonth] = React.useState('1');
  const [dayOfWeek, setDayOfWeek] = React.useState('Sunday');

  const daysOfWeekIndex = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

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

  const getNextDate = (currDateMoment, period, periodVal) => {
    if (period === 'month') {
      return moment([
        currDateMoment.year(),
        currDateMoment.month(),
        periodVal,
      ]).add(1, 'month');
    } else {
      return currDateMoment.weekday(periodVal);
    }
  };
  const [isVisible, setIsVisible] = useState(false);
  const [lines, setLines] = useState([
    "You're all set",
    'I have created a repeating task for you',
  ]);
  const navigate = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Home', params: { headerShown: false } },
          {
            name: 'ViewTasks',
            params: { title: 'View Tasks', headerShown: false },
          },
        ],
      }),
    );
  };

  return (
    <View style={styles.container}>
      {TaskCreatedModal(isVisible, navigate, lines)}
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
            height: 300,
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
              height: 80,
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
            const task = {};
            task.name = taskObject.taskName;
            task.category = taskObject.taskCategory;
            task.isCompleted = 0;
            task.isRecurring = taskObject.isRecurring;
            // console.log("Tasktime hours "+JSON.stringify(taskObject.taskTime.hours)+ " "+JSON.stringify(taskObject.taskTime.minutes)+
            // " "+JSON.stringify(taskObject.taskTime.seconds))

            // convert time to seconds
            var taskTimeInSeconds =
              taskObject.taskTime.hours * 3600 +
              taskObject.taskTime.minutes * 60 +
              taskObject.taskTime.seconds;
            // Get seconds in HH:mm:ss format
            taskTimeInSeconds = moment(taskObject.taskDate)
              .startOf('day')
              .seconds(taskTimeInSeconds)
              .format('HH:mm:ss');
            //console.log("Task time is "+taskTimeInSeconds)

            // Concat date and time
            task.taskFinishBy = moment(
              `${taskObject.taskDate} ${taskTimeInSeconds}`,
              'YYYY-MM-DD HH:mm:ss',
            ).toISOString();
            //console.log("task object "+ JSON.stringify(task))
            task.createdDate = new Date().toISOString();

            console.log('Task object is ' + JSON.stringify(task));
            const insertResult = await createTask(task);
            console.log('Insert Result is ' + JSON.stringify(insertResult));

            console.log('day of week ' + dayOfWeek);
            // if(period == 'month'){

            //   getNextDate(task.taskFinishBy,period, dayOfMonth)
            // }
            // else getNextDate(task.taskFinishBy,period,daysOfWeekIndex[dayOfWeek])

            // Original record insert is successful. Insert another entry for denoting repeated task
            if (insertResult.length > 0) {
              const taskID = insertResult.insertId;
              if (task.isRecurring == true) {
                // Insert another entry to db, whose parentID field is the current task ID.
                // All other fields remain the same
                task.parentJobID = taskID;
                /* 
                      repeatFrequency: {type:types.TEXT},
                      repeatDay:       {type:types.TEXT},
                      repeatWeek:      {type:types.TEXT}
                
                */
                //task.taskFinishBy =
                const insertResult2 = await createTask(task);
                console.log(
                  'Insert Result is ' + JSON.stringify(insertResult2),
                );
              }
            } else {
              console.log(
                'Insert not performed ' + JSON.stringify(insertResult2),
              );
            }
            //Check if the task has isRecurring to true
            setLines([
              'You are all set',
              'I have created a task that repeats on ' +
                (period == 'month'
                  ? dayOfMonth + ' of every month'
                  : dayOfWeek),
            ]);
            setIsVisible(!isVisible);
          }}
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
