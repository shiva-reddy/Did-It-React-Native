import React from 'react';
import { StyleSheet, View } from 'react-native';
import ConversationCard from '../components/ConversationCard';
import NextStepButton from '../components/NextStepButton';
import { StackActions } from '@react-navigation/native';

import { connect } from 'react-redux';

const SetTaskNameVerification = ({ navigation, route, mode, taskCategory }) => {
  const chosenText = route.params.chosenText;

  const redoAction = (taskCategory) => {
    const pushAction = StackActions.push('SetTaskName', {
      taskCategory,
    });

    navigation.dispatch(pushAction);
  };

  return (
    <View style={styles.container}>
      <ConversationCard
        style={{ flex: 2 }}
        avatarText={
          mode === 'create'
            ? 'Is this your task name?'
            : 'Update your task name to this?'
        }
        userText={chosenText}
        redoAction={redoAction}
        taskCategory={taskCategory}
      />
      <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 30 }}>
        <NextStepButton action={() => navigation.navigate('SetTaskDate')} />
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

export default connect(mapStateToProps)(SetTaskNameVerification);
