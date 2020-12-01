import React from 'react';
import { StyleSheet, View } from 'react-native';

import ConversationCard from '../components/ConversationCard';
import InputModeButton from '../components/InputModeButton';

import { connect } from 'react-redux';

const SetTaskName = ({ navigation, taskCategory }) => {
  console.log(taskCategory);

  return (
    <View style={styles.container}>
      <ConversationCard avatarText="Choose your input method" />
      <View style={{ flex: 3, flexDirection: 'row' }}>
        <View style={styles.options}>
          <InputModeButton
            icon="microphone"
            action={() =>
              navigation.navigate('SetTaskNameVoice', {
                taskCategory,
              })
            }
          />
          <InputModeButton
            icon="pencil"
            action={() =>
              navigation.navigate('SetTaskNameKeyboard', {
                taskCategory,
              })
            }
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

const mapStateToProps = (state) => {
  const { taskCategory } = state.createTask;
  return { taskCategory };
};

export default connect(mapStateToProps)(SetTaskName);
