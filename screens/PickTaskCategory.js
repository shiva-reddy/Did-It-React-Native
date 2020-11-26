import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import TaskCategories from '../utils/TaskCategories';

import MyAppText from '../components/MyAppText';

const TaskCategoryCard = ({navigation, props}) => {
  return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CreateTask', {
            screen: 'SetTaskName',
            params: { taskCategory: props },
          });
        }}
      >
        <View style={styles.card}>
          <Foundation
            style={[styles.icon]}
            name={props.icon}
            size={80}
            color="#2A9D8F"
          />
          <MyAppText>
            <Text style={styles.modeText}>{props.title}</Text>
          </MyAppText>
        </View>
      </TouchableOpacity>
  );
};

const CreateTask = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MyAppText>
      <Text style={styles.modeText}>What kind of task?</Text>
      </MyAppText>
      <View style={styles.container}>
        {TaskCategories.map(cat => (
          <TaskCategoryCard navigation={navigation} props={cat}/>
        ))}
      </View>
   </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  modeText: {
    fontSize: 40,
  },
  card:{
    backgroundColor: '#FFFF',
    flexDirection: 'row',
    width: 300,
    height: 145,
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#264653',
  },
});

export default CreateTask;
