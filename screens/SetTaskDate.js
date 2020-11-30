import React from 'react';
import { StyleSheet, View } from 'react-native';
import ConversationCard from '../components/ConversationCard';
import NextStepButton from '../components/NextStepButton';
import CalendarPicker from 'react-native-calendar-picker';
import { useTheme } from '@react-navigation/native';

const SetTaskDate = ({ route, navigation }) => {
  const {
    primaryColor,
    secondaryColor,
    tertiaryColor,
    accentColor,
  } = useTheme();

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
            color: accentColor,
          }}
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
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#264653',
  },
});

export default SetTaskDate;
