import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Icon,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import ConversationCard from '../components/ConversationCard';
import MyAppText from '../components/MyAppText';
import NextStepButton from '../components/NextStepButton';
//import CalendarPicker from 'react-native-calendar-picker';

const SetTaskDate = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <ConversationCard avatarText="By what date do you plan on completing this task?" />
      <View style={{ marginBottom: 30, backgroundColor: '#ffff' }}>
        {/* <CalendarPicker/> */}
      </View>
      <View
        style={{
          alignSelf: 'stretch',
          flexDirection: 'row-reverse',
          marginBottom: 20,
        }}
      >
        <NextStepButton
          content="Next Step"
          action={() => navigation.navigate('SetTaskTime')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  options: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default SetTaskDate;
