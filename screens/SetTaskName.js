import React from 'react';
import { StyleSheet, View,Text } from 'react-native';

import ConversationCard from '../components/ConversationCard';
import InputModeButton from '../components/InputModeButton';
import MyAppText from '../components/MyAppText';

import { connect } from 'react-redux';

const SetTaskName = ({ route, navigation, taskCategory, mode}) => {

  const taskID = route.params.taskID ? route.params.taskID : null;
  console.log(taskID);
  const question = taskID != null ? "How do you want to enter your new name?"
  : "How do you want to enter the name of your " + route.params.taskType;
  return (
    <View style={styles.container}>
      <ConversationCard avatarText={question} />
      <View style={{ flex: 3, flexDirection: 'row' }}>
        <View style={styles.options}>
          <View>
            
          <InputModeButton
            icon="microphone"
            action={() => navigation.navigate('CreateTask', {
              screen: 'SetTaskNameVoice',
              params: {
                taskCategory: taskCategory,
                taskID,
              },
            })}
          />
          <MyAppText>I'll say it by voice</MyAppText>
          </View>
          <View>
          <InputModeButton
            icon="pencil"
            action={() => navigation.navigate('CreateTask', {
              screen: 'SetTaskNameKeyboard',
              params: {
                taskCategory: taskCategory,
                taskID,
              },
            })}
          />
          <MyAppText>I'll type it in</MyAppText>
          </View>
        </View>
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
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#264653',
  },
  button: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  options: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const mapStateToProps = (state) => {
  const { taskCategory, mode } = state.createTask;
  return { taskCategory, mode };
};

export default connect(mapStateToProps)(SetTaskName);
