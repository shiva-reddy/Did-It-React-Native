import React from 'react';
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

const tasks = [
  { name: 'Task 1', deadline: '11-17-2020' },
  { name: 'Task 2', deadline: '11-17-2020' },
  { name: 'Task 3', deadline: '11-17-2020' },
  { name: 'Task 4', deadline: '11-17-2020' },
  { name: 'Task 5', deadline: '11-17-2020' },
  { name: 'Task 6', deadline: '11-17-2020' },
  { name: 'Task 7', deadline: '11-17-2020' },
  { name: 'Task 8', deadline: '11-17-2020' },
  { name: 'Task 9', deadline: '11-17-2020' },
  { name: 'Task 10', deadline: '11-17-2020' },
];

const UpcomingTasks = () => {
  const navigationObject = useNavigation();

  const renderTasks = ({ item }) => {
    return (
      <Card containerStyle={{ borderRadius: 10, backgroundColor: '#264653' }}>
        <TouchableOpacity
          onPress={() => {
            navigationObject.navigate('MarkTaskAsDone', {
              name: item.name,
              deadline: item.deadline,
              description: item.description,
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
                  Deadline: {item.deadline}
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
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    //justifyContent: 'flex-start',
    //alignItems: 'flex-start',
    //alignSelf: 'flex-start',
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
