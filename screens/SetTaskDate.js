import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ConversationCard from '../components/ConversationCard';
import NextStepButton from '../components/NextStepButton';
import CalendarPicker from 'react-native-calendar-picker';
import { useTheme } from '@react-navigation/native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addTaskDate } from '../store/CreateTaskActions';
import Toast from 'react-native-simple-toast';

const SetTaskDate = ({ route, navigation, addTaskDate }) => {

  const taskID = route.params && route.params.taskID ? route.params.taskID : null;
  const taskType = route.params.taskType;
  // console.log(taskID);
  const {
    primaryColor,
    secondaryColor,
    tertiaryColor,
    accentColor,
  } = useTheme();

  const [dateSelected, setDate] = useState('');

  const onDateChange = (date, type) => {
    // console.log("date is "+date.format())
    const [dateFormatted] = date.format().split('T');
    setDate(dateFormatted);
  };

  const moment = require('moment');
  const now = moment().subtract(1,'days');
  console.log("Now is "+now)
  return (
    <View style={styles.container}>
      <ConversationCard avatarText="By what date do you plan on completing this task?" />
      <View style={{ marginBottom: 30, backgroundColor: tertiaryColor }}>
        <CalendarPicker
          textStyle={{
            fontFamily: 'Pangolin_400Regular',
            color: secondaryColor,
          }}
          selectedDayColor={accentColor}
          todayBackgroundColor={primaryColor}
          todayTextStyle={{
            color: 'black',
          }}
          onDateChange={onDateChange}
          disabledDates={date => date < now}
        />
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          marginRight: 25,
          marginBottom: 20,
        }}
      >
        <NextStepButton
          content="Choose time next"
          action={() => {
            if (dateSelected !== null && dateSelected.length !== 0) {
              addTaskDate({ taskDate: dateSelected });
              navigation.navigate('SetTaskTime',{taskID,taskType});
            } else {
              Toast.show('Please select a date', Toast.SHORT, Toast.BOTTOM);
            }
          }}
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
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#264653',
  },
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addTaskDate,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(SetTaskDate);
