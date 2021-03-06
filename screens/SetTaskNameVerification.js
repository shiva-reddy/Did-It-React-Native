import React from 'react';
import { StyleSheet, View } from 'react-native';
import ConversationCard from '../components/ConversationCard';
import NextStepButton from '../components/NextStepButton';
import { StackActions } from '@react-navigation/native';
import { updateTaskName } from '../database/Utilities/api';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTaskName } from '../store/CreateTaskActions';

const SetTaskNameVerification = ({
  navigation,
  route,
  mode,
  taskCategory,
  addTaskName,
}) => {
  const chosenText = route.params.chosenText;
  const taskType = route.params.taskType;

  const taskID =
    route.params && route.params.taskID ? route.params.taskID : null;
  console.log(taskID != null);
  const redoAction = (taskCategory) => {
    const pushAction = StackActions.push('SetTaskName', {
      taskCategory,
      taskID,
    });

    navigation.dispatch(pushAction);
  };

  const updateDescription = () => {
    updateTaskName(taskID, chosenText);
  };

  return (
    <View style={styles.container}>
      <ConversationCard
        style={{ flex: 2 }}
        avatarText={
          taskID == null
            ? `Is this your ${taskType} name?`
            : 'Update your task name to this?'
        }
        userText={chosenText}
        redoAction={redoAction}
        taskCategory={taskCategory}
      />
      <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 30 }}>
        <NextStepButton
          action={() => {
            if (taskID != null) {
              console.log('Save with task id ' + taskID);
              updateDescription();
              navigation.navigate('MarkTaskAsDone', {
                screen: 'EditTaskOptions',
                taskID,
                taskType: 'Upcoming',
              });
            } else {
              console.log({ taskName: chosenText });
              addTaskName({ taskName: chosenText });
              navigation.navigate('SetTaskDate', {
                taskType,
              });
            }
          }}
          content="Yes, looks good"
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
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#264653',
  },
  input: {
    height: 40,
    width: 300,
    color: '#FFFF',
    borderColor: 'gray',
    borderWidth: 1,
  },
});

const mapStateToProps = (state) => {
  const { taskCategory, mode } = state.createTask;
  return { taskCategory, mode };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addTaskName,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetTaskNameVerification);
