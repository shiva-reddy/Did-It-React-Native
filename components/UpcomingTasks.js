import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-elements';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import MyAppText from './MyAppText';
import { getUpcomingTasks } from '../database/Utilities/api';
import { Feather } from '@expo/vector-icons';

// const tasks = [
//   {
//     name: 'Task 1',
//     deadline: '11-17-2020',
//     description: 'Its a math day',
//     isRecurring: 'Yes',
//   },
//   {
//     name: 'Task 2',
//     deadline: '11-17-2020',
//     description: 'Its a math day',
//     isRecurring: 'Yes',
//   },
//   {
//     name: 'Task 3',
//     deadline: '11-17-2020',
//     description: 'Its a math day',
//     isRecurring: 'Yes',
//   },
//   {
//     name: 'Task 4',
//     deadline: '11-17-2020',
//     description: 'Its a math day',
//     isRecurring: 'Yes',
//   },
//   {
//     name: 'Task 5',
//     deadline: '11-17-2020',
//     description: 'Its a math day',
//     isRecurring: 'Yes',
//   },
//   {
//     name: 'Task 6',
//     deadline: '11-17-2020',
//     description: 'Its a math day',
//     isRecurring: 'Yes',
//   },
//   {
//     name: 'Task 7',
//     deadline: '11-17-2020',
//     description: 'Its a math day',
//     isRecurring: 'Yes',
//   },
//   {
//     name: 'Task 8',
//     deadline: '11-17-2020',
//     description: 'Its a math day',
//     isRecurring: 'Yes',
//   },
//   {
//     name: 'Task 9',
//     deadline: '11-17-2020',
//     description: 'Its a math day',
//     isRecurring: 'Yes',
//   },
//   {
//     name: 'Task 11',
//     deadline: '11-17-2020',
//     description: 'Its a math day',
//     isRecurring: 'Yes',
//   },
// ];

const UpcomingTasks = ({ category, activity }) => {
  //console.log('rendering in upcoming tasks ' + dbData);
  const navigationObject = useNavigation();
  // const [tasks,setData] = useState([])
  const [tasks, setData] = useState([]);
  const [refreshList, setBoolean] = useState(false);

  useEffect(() => {
    async function getTasks() {
      const upcoming = await getUpcomingTasks(activity);
      const data = upcoming.rows;
      console.log(data);
      setData(data);
      setBoolean(!refreshList);
    }
    getTasks();
  }, [activity]);

  //console.log('Upcoming Rows is', dbData.length);
  const renderTasks = ({ item }) => {
    return (
      <Card containerStyle={{ borderRadius: 10, backgroundColor: '#264653' }}>
        <TouchableOpacity
          onPress={() => {
            navigationObject.navigate('MarkTaskAsDone', {
              name: item.name,
              deadline: new Date(item.taskFinishBy).toLocaleDateString('en-US'),
              description: '',
              isRecurring: item.isRecurring,
              category: item.category,
              id: item.id,
              taskID: item.id,
              taskType: 'Upcoming',
            });
          }}
        >
          <View style={[styles.cardContainer, { flexDirection: 'row' }]}>
            <View
              style={[
                styles.cardContainer,
                {
                  flexDirection: 'column',
                  flex: 3,
                  justifyContent: 'space-between',
                },
              ]}
            >
              <MyAppText alignCenter={false}>
                <Text style={styles.taskHeading}>{item.name}</Text>
              </MyAppText>
              <MyAppText alignCenter={false}>
                <Text style={styles.taskDeadline}>
                  Deadline:{' '}
                  {new Date(item.taskFinishBy).toLocaleDateString('en-US')}
                </Text>
              </MyAppText>
            </View>
            <View
              style={[
                styles.cardContainer,
                {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  console.log('TaskId is ' + item.id);
                  navigationObject.navigate('CreateTask', {
                    screen: 'EditTaskOptions',
                    params: { taskID: item.id },
                  });
                }}
              >
                <Foundation
                  style={styles.actionIcon}
                  name="pencil"
                  size={30}
                  color="#E76F51"
                />
              </TouchableOpacity>
              {item.isRecurring ? (
                <Feather
                  style={{ marginBottom: 25 }}
                  name="repeat"
                  size={24}
                  color="#E76F51"
                />
              ) : (
                <View></View>
              )}
              {item.name === 'Math Homework' ? (
                <FontAwesome
                  style={{ marginBottom: 25 }}
                  name="warning"
                  size={24}
                  color="#E76F51"
                />
              ) : (
                <View></View>
              )}
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#E76F51',
                  borderRadius: 4,
                  backgroundColor: '#E76F51',
                  width: 50,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigationObject.navigate('GetUserCameraPreference', {
                      taskId: item.id,
                    })
                  }
                >
                  <Entypo
                    name="check"
                    style={{ paddingLeft: 10 }}
                    size={30}
                    color="#E9C46A"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <FlatList
      data={tasks}
      renderItem={renderTasks}
      keyExtractor={(item) => item.name}
      extraData={refreshList}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  taskHeading: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  taskDeadline: {
    fontSize: 15,
  },
  actionIcon: {
    marginBottom: 30,
  },
});

export default UpcomingTasks;
