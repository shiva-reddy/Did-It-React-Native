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
import MyAppText from './MyAppText';
import { getUpcomingTasks } from '../database/Utilities/api';

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

const UpcomingTasks = ({ category }) => {
  console.log('rendering');
  const navigationObject = useNavigation();
  const [tasks, setData] = useState([]);
  const [refreshList2, setBoolean] = useState(false);

  useEffect(() => {
    async function createTable() {
      //console.log("Getting upcoming tasks")
      // Update the document title using the browser API
      //let upcomingTasks = await getUpcomingTasks()
      //setData(upcomingTasks.rows)
      //setBoolean(!refreshList2)
    }
    console.log('Upcoming tasks rendered');
    //createTable();
  }, []);

  //console.log('Upcoming Rows is', tasks.length);
  const renderTasks = ({ item }) => {
    //console.log("item is "+item)
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
              <Foundation
                style={styles.actionIcon}
                name="pencil"
                size={30}
                color="#E76F51"
              />
              <Entypo name="check" size={30} color="#E76F51" />
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
      extraData={refreshList2}
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
