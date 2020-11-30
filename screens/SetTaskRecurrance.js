import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ConversationCard from '../components/ConversationCard';
import MyAppText from '../components/MyAppText';
import { useTheme } from '@react-navigation/native';
//import CalendarPicker from 'react-native-calendar-picker';

const option = (text, action) => {
  const { tertiaryColor } = useTheme();

  return (
    <TouchableOpacity
      style={styles({ tertiaryColor }).button}
      onPress={() => action()}
    >
      <MyAppText>
        <Text style={styles({}).modeText}>{text}</Text>
      </MyAppText>
    </TouchableOpacity>
  );
};

const SetTaskRecurrance = ({ route, navigation }) => {
  return (
    <View style={styles({}).container}>
      <ConversationCard avatarText="Does this task repeat?" />
      <View style={{ flex: 3, flexDirection: 'row' }}>
        <View style={styles({}).options}>
          {option('Yes', () => {
            navigation.navigate('SetTaskRecurranceSchedule');
          })}
          {option('No', () => {
            navigation.navigate('ViewTasks');
          })}
        </View>
      </View>
    </View>
  );
};

const styles = ({ tertiaryColor, secondaryColor }) =>
  StyleSheet.create({
    icon: {
      marginTop: 20,
      marginHorizontal: 20,
    },
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#264653',
    },
    button: {
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 100,
      backgroundColor: tertiaryColor,
      borderRadius: 100,
    },
    modeText: {
      fontSize: 35,
    },
    options: {
      flex: 6,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
  });

export default SetTaskRecurrance;
