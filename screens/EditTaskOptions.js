import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import ConversationCard from '../components/ConversationCard';
import InputModeButton from '../components/InputModeButton';
import { useTheme } from '@react-navigation/native';
import { Foundation } from '@expo/vector-icons';
import MyAppText from '../components/MyAppText';
import { connect } from 'react-redux';

const option = (text, action) => {
  const { tertiaryColor, secondaryColor } = useTheme();
  return (
  <TouchableOpacity
    style= {styles({ tertiaryColor }).button}
    onPress= {action ? action : () => {}}
  >
    <MyAppText>{text}</MyAppText>
  </TouchableOpacity>);
};

const EditTaskOptions = ({ navigation, taskCategory }) => {
  const { tertiaryColor, secondaryColor } = useTheme();
  return (
    <View style={styles({ tertiaryColor }).container}>
      <ConversationCard avatarText="What do you want to update on this task?" />
      <View style={{ flex: 6, flexDirection: 'row' }}>
        <View style={styles({ tertiaryColor }).options}>
          {option('The task description', () => {})}
          {option('The task date', () => {})}
        </View>
      </View>
    </View>
  );
};

const styles = ({ tertiaryColor }) => StyleSheet.create({
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
    width: 300,
    height: 100,
    backgroundColor: tertiaryColor,
    borderRadius: 20,
  },
  options: {
    flex: 6,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const mapStateToProps = (state) => {
  const { taskCategory } = state.createTask;
  return { taskCategory };
};

export default connect(mapStateToProps)(EditTaskOptions);
