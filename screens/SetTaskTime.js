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
import InlineTimePicker from 'react-native-inline-timepicker';

const SetTaskTime = ({ route, navigation }) => {
  const [time, setTime] = React.useState({
    hours: 12,
    minutes: 0,
    seconds: 0,
    meridian: "AM"
  });
  const updateTime = (h, m, s, mn) => {
    setTime({hours: h, minutes: m, seconds: s, meridian: mn});
  }
  
  return (
    <View style={styles.container}>
      <ConversationCard avatarText="By what date do you plan on completing this task?" />
      <View style={{ marginBottom: 30, flex: 6,alignSelf: 'stretch' }}>
          <InlineTimePicker onChangeTime = {updateTime}/>
      </View>
      <View style={{alignSelf: 'stretch', flexDirection: 'row-reverse',marginBottom: 20}}>
          <NextStepButton content="Next Step" action={() => navigation.navigate("SetTaskRecurrance")}/>
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

export default SetTaskTime;
