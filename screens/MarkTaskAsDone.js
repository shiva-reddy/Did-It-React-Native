import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MyAppText from '../components/MyAppText';

const ViewDetailedTask = ({ navigation, route }) => {
  const taskName = route.params.name;
  const taskDeadline = route.params.deadline;
  const taskDescription = route.params.description;
  const taskIsRecurring = route.params.isRecurring;

  return (
    <View style={styles.container}>
      <MyAppText>
        <Text style={styles.taskHeading}>{taskName}</Text>
        <Text style={styles.taskHeading}>{taskDeadline}</Text>
        <Text style={styles.taskHeading}>{taskDescription}</Text>
        <Text style={styles.taskHeading}>{taskIsRecurring}</Text>
      </MyAppText>
    </View>
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

export default ViewDetailedTask;
