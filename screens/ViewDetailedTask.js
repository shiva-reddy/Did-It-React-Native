import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Button,
  TouchableOpacity,
  ImageBackground
  
} from 'react-native';
import MyAppText from '../components/MyAppText';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { deleteTask, getTask } from '../database/Utilities/api';
import { useTheme } from '@react-navigation/native';
import DeleteModal from '../components/DeleteModal';
import { CommonActions } from '@react-navigation/native';
import {useNavigation} from "@react-navigation/native";

const ViewDetailedTask = ({ navigation, route}) => {
  const taskID = route.params.taskID;
  const taskType = route.params.taskType
  console.log(taskID);
  console.log("Task type "+taskType)

  const [task, setTask] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    const taskObj = await getTask(taskID);
    console.log("Task object is" +JSON.stringify(taskObj));
    setTask({
      taskName: taskObj.name,
      taskDeadline: new Date(taskObj.taskFinishBy).toLocaleDateString('en-US'),
      taskDescription: '',
      taskIsRecurring: taskObj.isRecurring,
      taskID: taskObj.taskID,
      taskPhotoURI: taskObj.photoURI
    });
  };

  const {
    primaryColor,
    secondaryColor,
    tertiaryColor,
    accentColor,
  } = useTheme();

  return (
    <View style={[styles({}).container]}>
      {DeleteModal(isVisible, () => {setIsVisible(!isVisible)},() => {deleteTask(taskID)})}
      <View
        style={[
          {
            justifyContent: 'flex-end',
            flexDirection: 'row',
            marginRight: 20,
            marginTop: 20,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => setIsVisible(!isVisible)}
        >
          <Entypo name="trash" size={30} color={accentColor} />
        </TouchableOpacity>
      </View>
      <View>
        <MyAppText>
          <Text
            style={[
              { flex: 5, backgroundColor: '#264653' },
              styles({
                secondaryColor,
              }).headerStyle,
            ]}
          >
            {task.taskName}
          </Text>
        </MyAppText>
      </View>
      <View style={[{ flex: 1 }, styles({}).elementsContainer]}>
        {taskType === "Upcoming" && (    <View style={{ flex: 3, backgroundColor: '#264653' }}>
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <View style={styles({ primaryColor }).taskDetailTexts}>
              <MyAppText>
                <Text style={styles({}).secondaryText}>Deadline</Text>
              </MyAppText>
            </View>
            <View style={styles({ primaryColor }).taskDetailTexts}>
              <MyAppText>
                <Text style={styles({}).secondaryText}>
                  {task.taskDeadline}
                </Text>
              </MyAppText>
            </View>
          </View>
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <View style={styles({ primaryColor }).taskDetailTexts}>
              <MyAppText>
                <Text style={styles({}).secondaryText}>Created Date</Text>
              </MyAppText>
            </View>
            <View style={styles({ primaryColor }).taskDetailTexts}>
              <MyAppText>
                <Text style={styles({}).secondaryText}>
                  {task.taskDeadline}
                </Text>
              </MyAppText>
            </View>
          </View>
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <View
              style={[
                styles({ primaryColor }).taskDetailTexts,
                { paddingLeft: 30 },
              ]}
            >
              <MyAppText>
                <Text style={styles({}).secondaryText}>
                  Does the Task Repeat ?
                </Text>
              </MyAppText>
            </View>
            <View style={styles({ primaryColor }).taskDetailTexts}>
              <MyAppText>
                <Text style={styles({}).secondaryText}>
                  {task.taskIsRecurring == 1 ? 'Yes' : 'No'}
                </Text>
              </MyAppText>
            </View>
          </View>
        </View>)}


        {taskType === "Upcoming"?(
            <View style={{ backgroundColor: '#264653', flexDirection: 'row' }}>
          <View style={[{ flex: 1, flexDirection: 'row' }]}>
          <Pressable onPress={() => {
                navigation.navigate('CreateTask', {
                  screen: 'EditTaskOptions',
                  taskID,
                });
              }}
              >
            <Foundation
              style={styles.actionIcon}
              name="pencil"
              size={30}
              color="#E76F51"
            />
          </Pressable>
        </View>
          <View style={[{ justifyContent: 'flex-end' }]}>
            <Pressable
              onPress={() => {
                navigation.navigate('GetUserCameraPreference', {
                  taskId: taskID,
                });
              }}
            >
              <Entypo name="check" size={40} color="#E76F51" />
            </Pressable>
          </View>
          </View>):(

              <ImageBackground
                source={{ uri: task.taskPhotoURI }}
                style={{
                  flex: 1,
                }}
              ></ImageBackground>
          )}

      </View>
    </View>
  );
};

const styles = ({ primaryColor, secondaryColor, tertiaryColor }) =>
  StyleSheet.create({
    container: {
      marginTop: 0,
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#264653',
    },
    headerStyle: {
      fontSize: 50,
      textAlign: 'center',
      fontWeight: '100',
      color: secondaryColor,
    },
    elementsContainer: {
      backgroundColor: '#ecf5fd',
      marginLeft: 24,
      marginRight: 24,
      marginBottom: 24,
      marginTop: 24,
    },
    taskDetailTexts: {
      width: '50%',
      height: 50,
      backgroundColor: primaryColor,
    },
    secondaryText: {
      fontSize: 20,
    },
  });

export default ViewDetailedTask;
