import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import MyAppText from './MyAppText';

const tasks = [
  { name: 'Task 1', deadline: '11-16-2020' },
  { name: 'Task 2', deadline: '11-16-2020' },
  { name: 'Task 3', deadline: '11-15-2020' },
  { name: 'Task 4', deadline: '11-14-2020' },
  { name: 'Task 5', deadline: '11-13-2020' },
];

const renderTasks = ({ item }) => {
  return (
    <Card containerStyle={{ borderRadius: 10, backgroundColor: '#264653' }}>
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
            <Text style={styles.taskDeadline}>Deadline: {item.deadline}</Text>
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
    </Card>
  );
};

const CompletedTasks = () => {
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

export default CompletedTasks;
