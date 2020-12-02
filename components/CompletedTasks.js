import React, {useState, useEffect} from 'react';
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
import {getCompletedTasks} from '../database/Utilities/api'

const tasks = [
  { name: 'Task 1', deadline: '11-17-2020', description:"Its a math day",isRecurring:"Yes" },
  { name: 'Task 2', deadline: '11-17-2020', description:"Its a math day",isRecurring:"Yes" },
  { name: 'Task 3', deadline: '11-17-2020', description:"Its a math day",isRecurring:"Yes" },
  { name: 'Task 4', deadline: '11-17-2020', description:"Its a math day",isRecurring:"Yes" },
  { name: 'Task 5', deadline: '11-17-2020', description:"Its a math day",isRecurring:"Yes" },
  { name: 'Task 6', deadline: '11-17-2020', description:"Its a math day",isRecurring:"Yes" },
  { name: 'Task 7', deadline: '11-17-2020', description:"Its a math day",isRecurring:"Yes" },
  { name: 'Task 8', deadline: '11-17-2020', description:"Its a math day",isRecurring:"Yes" },
  { name: 'Task 9', deadline: '11-17-2020', description:"Its a math day",isRecurring:"Yes" },
  { name: 'Task 11',deadline: '11-17-2020', description:"Its a math day",isRecurring:"Yes" }
];

const CompletedTasks = ({category,dbData}) => {
  console.log("rendering2 in completed tasks "+dbData)
  const navigationObject = useNavigation();
  const [tasks,setData] = useState([])
  const [refreshList, setBoolean] = useState(false)

  useEffect(() => {

    console.log ("Date is "+new Date()+" Data "+dbData)
    setBoolean(!refreshList)
    setData(dbData)
    // async function createTable () {
    //   // Update the document title using the browser API
    //   let upcomingTasks = await getCompletedTasks()
    //   console.log("Completed tasks "+JSON.stringify(upcomingTasks.rows))
    //   setData(upcomingTasks.rows)
    //   setBoolean(!refreshList)
    // }
    // createTable();
  },[dbData]);

  // async function createTable () {
  //   // Update the document title using the browser API
  //   let upcomingTasks = await getCompletedTasks()
  //   console.log("Completed tasks "+JSON.stringify(upcomingTasks.rows))
  //   setData(upcomingTasks.rows)
  //   setBoolean(!refreshList)
  // }
  // createTable();

  console.log("Rows is",dbData.length)

  const renderTasks = ({ item }) => {
    //console.log("Items "+JSON.stringify(item))
    return (
      <Card containerStyle={{ borderRadius: 10, backgroundColor: '#264653' }}>
        <TouchableOpacity
          onPress={() => {
            navigationObject.navigate('MarkTaskAsDone', {
              name:        item.name,
              deadline:    new Date(item.taskFinishBy).toLocaleDateString('en-US'),
              description: "",
              isRecurring: item.isRecurring,
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
                  Deadline: {new Date(item.taskFinishBy).toLocaleDateString('en-US')}
                </Text>
              </MyAppText>
            </View>
            <View
              style={[
                styles.cardContainer,
                {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                },
              ]}
            >
              <Entypo name="trash" size={30} color="#E76F51" />
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <Text>{dbData}</Text>
    // <FlatList
    //   data={dbData}
    //   renderItem={renderTasks}
    //   keyExtractor={(item) => item.name}
    //   extraData = {refreshList}
    // ></FlatList>
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

export default CompletedTasks;
