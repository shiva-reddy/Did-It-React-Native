import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TaskCategories from '../utils/TaskCategories';
import { useTheme } from '@react-navigation/native';
import { createTask, deleteTask } from '../database/Utilities/api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTaskCategory, addMode } from '../store/CreateTaskActions';

import MyAppText from '../components/MyAppText';

const TaskCategoryCard = ({ navigation, props }) => {
  const { accentColor, tertiaryColor, secondaryColor } = useTheme();
  console.log(props);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('CreateTask', {
          screen: 'EditTaskOptions',
          params: {
            taskCategory: props.title,
            mode: 'create',
          },
        });
        props.addTaskCategory({ taskCategory: props.title });
        props.addMode({ mode: 'create' });
      }}
    >
      <View style={styles({ accentColor, secondaryColor }).card}>
        {(() => {
          switch (props.iconPack) {
            case 'materialCommunity':
              return (
                <MaterialCommunityIcons
                  style={[styles({}).icon]}
                  name={props.icon}
                  size={70}
                  color={tertiaryColor}
                />
              );
            case 'FontAwesome5':
              return (
                <FontAwesome5
                  name={props.icon}
                  size={65}
                  style={[styles({}).icon]}
                  color={tertiaryColor}
                />
              );
          }
        })()}
        <MyAppText>
          <Text style={styles({}).modeText}>{props.title}</Text>
        </MyAppText>
      </View>
    </TouchableOpacity>
  );
};

// const CreateTask = ({ navigation }) => {

//   const { primaryColor } = useTheme();

//   function nextweek(){
//     var today = new Date();
//     var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+10);
//     return nextweek.toISOString();
//   }

//   useEffect(() => {

//   async function createTasks() {

//     var task = {
//       name:"Task1",
//       isCompleted:   0,
//       category:"Homework",
//       isRecurring:   1,
//       taskFinishBy : nextweek()
//     };
//     var task2 = {
//       name:"Task2",
//       isCompleted:   0,
//       category:"Homework",
//       isRecurring:   1,
//       taskFinishBy : nextweek()
//     };
//     var task3 = {
//       name:"Task3",
//       isCompleted:   1,
//       category:"Homework",
//       isRecurring:   0,
//       taskFinishBy : new Date().toISOString()
//     };
//     var task4 = {
//       name:"Task4",
//       isCompleted:   1,
//       category:"Homework",
//       isRecurring:   0,
//       taskFinishBy : new Date().toISOString()
//     };

//     // let result = await deleteTask(7)
//     // console.log('Task created result  '+result)
//     // result =     await deleteTask(8)
//     // console.log('Task created result  '+result)
//     // result =     await deleteTask(3)
//     // console.log('Task created result  '+result)
//     // result =     await deleteTask(4)
//     // console.log('Task created result  '+result)

//     // let result = await createTask(task)
//     // console.log('Task created result  '+result)
//     // result =     await createTask(task2)
//     // console.log('Task created result  '+result)
//     // result =     await createTask(task3)
//     // console.log('Task created result  '+result)
//     // result =     await createTask(task4)
//     // console.log('Task created result  '+result)

//   }
//   createTasks()

// }, [])

const CreateTask = ({ navigation, addTaskCategory }) => {
  const { primaryColor } = useTheme();
  console.log('from here' + addTaskCategory);
  return (
    <View style={styles({ primaryColor }).container}>
      <MyAppText>
        <Text style={styles({}).modeText}>What kind of task?</Text>
      </MyAppText>
      <View style={styles({ primaryColor }).container}>
        {TaskCategories.map((cat) => (
          <TaskCategoryCard
            navigation={navigation}
            props={{ ...cat, addTaskCategory, addMode }}
            key={`category-${cat.title}`}
          />
        ))}
      </View>
    </View>
  );
};

const styles = ({ accentColor, primaryColor, secondaryColor }) =>
  StyleSheet.create({
    icon: {
      marginTop: 30,
      marginHorizontal: 20,
    },
    modeText: {
      fontSize: 40,
    },
    card: {
      backgroundColor: primaryColor,
      flexDirection: 'row',
      width: 300,
      height: 130,
      borderColor: secondaryColor,
      borderWidth: 5,
      borderRadius: 5,
      justifyContent: 'flex-start',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: primaryColor,
    },
  });

const mapStateToProps = (state) => {
  const { taskCategory, mode } = state.createTask;
  return { taskCategory, mode };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addTaskCategory,
      addMode,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
