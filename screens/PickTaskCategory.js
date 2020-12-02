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
          screen: 'SetTaskName',
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
  const { taskCategory } = state.createTask;
  return { taskCategory };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addTaskCategory,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
