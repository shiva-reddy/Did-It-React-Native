import React from 'react';
import { StyleSheet, View } from 'react-native';
import ConversationCard from '../components/ConversationCard';
import NextStepButton from '../components/NextStepButton';
import InlineTimePicker from 'react-native-inline-timepicker';
import { useTheme } from '@react-navigation/native';

const SetTaskTime = ({ route, navigation }) => {
  const { primaryColor, secondaryColor, tertiaryColor } = useTheme();
  const [time, setTime] = React.useState({
    hours: 12,
    minutes: 0,
    seconds: 0,
    meridian: 'AM',
  });
  const updateTime = (h, m, s, mn) => {
    setTime({ hours: h, minutes: m, seconds: s, meridian: mn });
  };

  return (
    <View style={styles.container}>
      <ConversationCard avatarText="By what date do you plan on completing this task?" />
      <View style={{ marginBottom: 30, flex: 6, alignSelf: 'stretch' }}>
        <InlineTimePicker
          onChangeTime={updateTime}
          textBackgroundColor={primaryColor}
          containerBackgroundColor={tertiaryColor}
          textColor={secondaryColor}
          textBorderColor={secondaryColor}
        />
      </View>
      <View
        style={{
          marginBottom: 20,
          marginRight: 20,
        }}
      >
        <NextStepButton
          content="Next Step"
          action={() => navigation.navigate('SetTaskRecurrance')}
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

export default SetTaskTime;
