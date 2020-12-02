import React, { useState,useEffect } from 'react';
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

const ViewDetailedTask = ({ navigation, route}) => {
  const taskID = route.params.taskID;
  const taskType = route.params.taskType
  console.log(taskID);
  console.log("Task type "+taskType)

  const [task, setTask] = useState({});
  useEffect(() => {loadTask();}, [])

  const loadTask = async () => {
    const taskObj = await getTask(taskID);
    console.log("Task object is" +JSON.stringify(taskObj));
    setTask({
      taskName : taskObj.name,
      taskDeadline : new Date(taskObj.taskFinishBy).toLocaleDateString('en-US'),
      taskDescription: "",
      taskIsRecurring: taskObj.isRecurring,
      taskID: taskObj.taskID,
      taskPhotoURI: taskObj.photoURI
    });
  }

  const {
    primaryColor,
    secondaryColor,
    tertiaryColor,
    accentColor,
  } = useTheme();


  return (
    <View style={[styles({}).container]}>
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
          onPress={async () => {
            navigation.goBack();
            await deleteTask(taskID);
          }}
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
                <Text>Deadline</Text>
              </MyAppText>
            </View>
            <View style={styles({ primaryColor }).taskDetailTexts}>
              <MyAppText>
                <Text>{task.taskDeadline}</Text>
              </MyAppText>
            </View>
          </View>
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <View style={styles({ primaryColor }).taskDetailTexts}>
              <MyAppText>
                <Text>Created Date</Text>
              </MyAppText>
            </View>
            <View style={styles({ primaryColor }).taskDetailTexts}>
              <MyAppText>
                <Text>{task.taskDeadline}</Text>
              </MyAppText>
            </View>
          </View>
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <View style={styles({ primaryColor }).taskDetailTexts}>
              <MyAppText>
                <Text>Does the Task Repeat ?</Text>
              </MyAppText>
            </View>
            <View style={styles({ primaryColor }).taskDetailTexts}>
              <MyAppText>
                <Text>{task.taskIsRecurring == 1 ? 'Yes' : 'No'}</Text>
              </MyAppText>
            </View>
          </View>
          
        </View>)}
          {taskType === "Upcoming"?(
            <View style={{ backgroundColor: '#264653', flexDirection: 'row' }}>
          <View style={[{ flex: 1, flexDirection: 'row' }]}>
          <Foundation
            style={styles.actionIcon}
            name="pencil"
            size={30}
            color="#E76F51"
          />
        </View>
          <View style={[{ justifyContent: 'flex-end' }]}>
            <Pressable
              onPress={() => {
                navigation.navigate('GetUserCameraPreference', { taskId: taskID });
              }}
            >
              <Entypo name="check" size={30} color="#E76F51" />
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
      fontSize: 40,
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
    }
  });

export default ViewDetailedTask;
