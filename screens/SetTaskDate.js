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

const SetTaskDate = ({ route, navigation }) => {
  const {
    primaryColor,
    secondaryColor,
    tertiaryColor,
    accentColor,
  } = useTheme();

  const [dateSelected, setDate] = useState('');

  const onDateChange = (date, type) => {
    const [dateFormatted] = date.format().split('T');
    setDate(dateFormatted);
  };

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
          content="Next Step"
          action={() => {
            if (dateSelected !== null && dateSelected.length !== 0) {
              addTaskDate({ taskDate: dateSelected });
              navigation.navigate('SetTaskTime');
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
