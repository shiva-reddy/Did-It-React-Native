import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Button,
  TouchableOpacity,
} from 'react-native';
import MyAppText from '../components/MyAppText';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { deleteTask } from '../database/Utilities/api';
import { useTheme } from '@react-navigation/native';

const ViewDetailedTask = ({ navigation, route }) => {
  console.log('route params ' + JSON.stringify(route));

  const taskName = route.params.name;
  const taskDeadline = route.params.deadline;
  const taskDescription = route.params.description;
  const taskIsRecurring = route.params.isRecurring;
  const taskID = route.params.id;

  const [task, setTask] = useState({});
  useEffect(() => {loadTask();}, [])

  const loadTask = async () => {
    setTask(getTask(taskID));
  }

  const {
    primaryColor,
    secondaryColor,
    tertiaryColor,
    accentColor,
  } = useTheme();

  const [id, setID] = useState(id);

  console.log(
    taskName +
      ' ' +
      taskDeadline +
      ' ' +
      taskDescription +
      ' ' +
      taskIsRecurring,
  );

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
            {taskName}
          </Text>
        </MyAppText>
      </View>
      <View style={[{ flex: 1 }, styles({}).elementsContainer]}>
        <View style={{ flex: 3, backgroundColor: '#264653' }}>
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <View style={styles({ primaryColor }).taskDetailTexts}>
              <MyAppText>
                <Text>Deadline</Text>
              </MyAppText>
            </View>
            <View style={styles({ primaryColor }).taskDetailTexts}>
              <MyAppText>
                <Text>{taskDeadline}</Text>
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
                <Text>{taskDeadline}</Text>
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
                <Text>{taskIsRecurring == 1 ? 'Yes' : 'No'}</Text>
              </MyAppText>
            </View>
          </View>
        </View>
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
                navigation.navigate('GetUserCameraPreference', { taskId: id });
              }}
            >
              <Entypo name="check" size={30} color="#E76F51" />
            </Pressable>
          </View>
        </View>
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
     
    },
  });

export default ViewDetailedTask;
