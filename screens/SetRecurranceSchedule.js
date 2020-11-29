import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ConversationCard from '../components/ConversationCard';
import MyAppText from '../components/MyAppText';
import NextStepButton from '../components/NextStepButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme } from '@react-navigation/native';

const SetTaskRecurranceSchedule = ({ route, navigation }) => {
  const { secondaryColor, tertiaryColor } = useTheme();

  const [period, setPeriod] = React.useState('month');
  const daysOfMonth = Array.from(Array(30).keys()).map((day) => {
    return { label: (day + 1).toString(), value: (day + 1).toString() };
  });

  const [dayOfMonth, setDaysOfMonth] = React.useState('1');
  const [dayOfWeek, setDayOfWeek] = React.useState('Sunday');

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ].map((day) => {
    return { label: day, value: day };
  });

  return (
    <View style={styles.container}>
      <ConversationCard avatarText="How does the task repeat?" />
      <View
        style={{
          alignSelf: 'stretch',
          flex: 6,
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}
      >
        <DropDownPicker
          items={[
            { label: 'Month', value: 'month' },
            { label: 'Week', value: 'week' },
          ]}
          defaultValue={period}
          containerStyle={{ height: 40 }}
          style={{
            backgroundColor: tertiaryColor,
            borderColor: secondaryColor,
            width: 150,
          }}
          itemStyle={{ justifyContent: 'flex-start' }}
          dropDownStyle={{
            backgroundColor: tertiaryColor,
            borderColor: secondaryColor,
          }}
          onChangeItem={(item) => setPeriod(item.value)}
          labelStyle={{
            color: secondaryColor,
            fontFamily: 'Pangolin_400Regular',
          }}
        />
        {period === 'month' ? (
          <DropDownPicker
            items={daysOfMonth}
            defaultValue={dayOfMonth}
            containerStyle={{ height: 40 }}
            style={{
              backgroundColor: tertiaryColor,
              borderColor: secondaryColor,
              width: 150,
            }}
            itemStyle={{ justifyContent: 'flex-start', color: secondaryColor }}
            dropDownStyle={{
              backgroundColor: tertiaryColor,
              borderColor: secondaryColor,
            }}
            onChangeItem={(item) => setDaysOfMonth(item.value)}
            labelStyle={{
              color: secondaryColor,
              fontFamily: 'Pangolin_400Regular',
            }}
          />
        ) : (
          <DropDownPicker
            items={daysOfWeek}
            defaultValue={dayOfWeek}
            containerStyle={{ height: 40 }}
            style={{
              backgroundColor: tertiaryColor,
              borderColor: secondaryColor,
              width: 150,
            }}
            itemStyle={{ justifyContent: 'flex-start' }}
            dropDownStyle={{
              backgroundColor: tertiaryColor,
              borderColor: secondaryColor,
            }}
            onChangeItem={(item) => setDayOfWeek(item.value)}
            labelStyle={{
              color: secondaryColor,
              fontFamily: 'Pangolin_400Regular',
            }}
          />
        )}
      </View>
      <View
        style={{
          marginRight: 25,
          marginBottom: 20,
        }}
      >
        <NextStepButton
          content="Next Step"
          action={() => navigation.navigate('ViewTasks')}
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

export default SetTaskRecurranceSchedule;
