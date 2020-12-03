import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

import MyAppText from '../components/MyAppText';
import { useTheme } from '@react-navigation/native';

const Home = ({ navigation }) => {
  const { primaryColor, tertiaryColor } = useTheme();

  return (
    <View style={styles(primaryColor).container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CreateTask');
        }}
      >
        <Foundation
          style={[styles().icon, { paddingLeft: 40 }]}
          name="clipboard-pencil"
          size={120}
          color={tertiaryColor}
        />
        <MyAppText>
          <Text style={styles(primaryColor).modeText}>Create Task</Text>
        </MyAppText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ViewTasks')}>
        <FontAwesome5
          name="tasks"
          color={tertiaryColor}
          size={120}
          style={[styles(primaryColor).icon]}
        ></FontAwesome5>
        <MyAppText>
          <Text style={styles(primaryColor).modeText}>View Tasks</Text>
        </MyAppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = (primaryColor) =>
  StyleSheet.create({
    icon: {
      marginTop: 40,

      marginHorizontal: 20,
    },
    modeText: {
      fontSize: 40,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: primaryColor,
    },
  });

export default Home;
