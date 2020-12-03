import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableOpacity,
} from 'react-native';
import ConversationCard from '../components/ConversationCard';
import { Ionicons } from '@expo/vector-icons';
import MyAppText from '../components/MyAppText';
import TaskCreatedModal from '../components/TaskCreatedModal';
import { CommonActions, useTheme } from '@react-navigation/native';
import { markTaskAsDone } from '../database/Utilities/api';

const GetUserCameraPreference = ({ route, navigation }) => {
  const [isVisible, setIsVisible] = useState(false);

  const taskID = route.params.taskId;

  const markAsDone = async () => {
    await markTaskAsDone(taskID);
  };

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

  return (
    <View style={styles({}).container}>
      {TaskCreatedModal(isVisible, navigate, [
        'Great job!! I have marked this task as done',
      ])}
      <View style={{ flex: 6 }}>
        <ConversationCard avatarText="Do you want to add a picture to the task before marking it as done?" />
      </View>
      <View style={{ flex: 3, flexDirection: 'row' }}>
        <View style={styles({}).options}>
          {option('Yes', () => {
            navigation.navigate('TakePhotoFromCamera', { taskID: taskID });
          })}
          {option('No', async () => {
            await markAsDone();
            setIsVisible(!isVisible);
          })}
        </View>
      </View>
    </View>
  );
};

const styles = ({ tertiaryColor }) =>
  StyleSheet.create({
    icon: {
      marginTop: 20,
      marginHorizontal: 20,
    },
    container: {
      flex: 1,

      justifyContent: 'center',
      backgroundColor: '#264653',
      flexDirection: 'column',
    },
    button: {
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      width: 120,
      height: 120,
      backgroundColor: tertiaryColor,
      borderRadius: 100,
    },
    options: {
      flex: 6,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    modeText: {
      fontSize: 35,
    },
  });

export default GetUserCameraPreference;
