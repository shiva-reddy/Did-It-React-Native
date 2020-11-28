import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  Icon,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import ConversationCard from '../components/ConversationCard';
import MyAppText from '../components/MyAppText';
import InputModeButton from '../components/InputModeButton';
import TaskCreatedModal from '../components/TaskCreatedModal';
import Monster from '../assets/monsterReact';

const SetTaskName = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      {/* {TaskCreatedModal(true)} */}
      <ConversationCard avatarText="Choose your name" />
      <View style={{ flex: 3, flexDirection: 'row' }}>
        <View style={styles.options}>
          <InputModeButton
            icon="microphone"
            action={() => navigation.navigate('SetTaskNameKeyboard')}
          />
          <InputModeButton
            icon="pencil"
            action={() => navigation.navigate('SetTaskNameKeyboard')}
          />
        </View>
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

export default SetTaskName;
