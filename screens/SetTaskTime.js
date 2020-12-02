import React from 'react';
import { StyleSheet, View } from 'react-native';
import ConversationCard from '../components/ConversationCard';
import NextStepButton from '../components/NextStepButton';
import InlineTimePicker from 'react-native-inline-timepicker';
import { useTheme } from '@react-navigation/native';
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';
import { addTaskTime } from '../store/CreateTaskActions';
import {reScheduleTask} from '../database/Utilities/api';
import moment from 'moment';

const SetTaskTime = ({ route, navigation, addTaskTime }) => {
  const taskID = route.params.taskID ? route.params.taskID : null;
  
  const { primaryColor, secondaryColor, tertiaryColor } = useTheme();
  const [time, setTime] = React.useState({
    hours: 12,
    minutes: 0,
    seconds: 0,
    meridian: 'AM',
  });
  const updateTime = (h, m, s, mn) => {
    setTime({ hours: h, minutes: m, seconds: s, meridian: mn });
    console.log(time);
  };

  const reduxStore = async (state) => state.createTask;
  const savedObject = useSelector(reduxStore);
 
  const updateTaskTime = (savedObject) => {
    var taskTimeInSeconds  = savedObject.taskTime.hours*3600 + savedObject.taskTime.minutes*60 + savedObject.taskTime.seconds;
    taskTimeInSeconds = moment(savedObject.taskDate).startOf('day').seconds(taskTimeInSeconds).format('HH:mm:ss');
    const taskFinishBy = moment(
      `${savedObject.taskDate} ${taskTimeInSeconds}`,
      'YYYY-MM-DD HH:mm:ss',
    ).toISOString();
    reScheduleTask(taskID, taskFinishBy);
  };

  return (
    <View style={styles.container}>
      <ConversationCard avatarText={`Hmm..What time on ${savedObject.taskDate} will you finish it? `}/>
      <View style={{ marginBottom: 30, flex: 6, alignSelf: 'stretch' }}>
        <InlineTimePicker
          onChangeTime={updateTime}
          textBackgroundColor={primaryColor}
          containerBackgroundColor={tertiaryColor}
          textColor={secondaryColor}
          textBorderColor={secondaryColor}
        />
      </View>
      <View
        style={{
          marginBottom: 20,
          marginRight: 20,
        }}
      >
        <NextStepButton
          content="Next Step"
          action={async () => {
            addTaskTime({ taskTime: time });
            if(taskID != null){
              console.log("Updating time for task " + taskID);
              updateTaskTime(await savedObject);
              navigation.navigate('MarkTaskAsDone', {
                screen: 'EditTaskOptions',
                taskID,
              });
            }
            else navigation.navigate('SetTaskRecurrance');
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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addTaskTime,
    },
    dispatch,
  );

// const mapStateToProps = (state) => {
//   const { taskDate } = state.createTask;
//   return { taskDate };
// };

export default connect(null, mapDispatchToProps)(SetTaskTime);
