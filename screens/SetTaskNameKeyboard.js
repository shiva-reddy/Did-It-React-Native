import React from 'react';
import { StyleSheet, View, TouchableOpacity, Button } from 'react-native';
import ConversationCard from '../components/ConversationCard';
import { Input } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import NextStepButton from '../components/NextStepButton';
import Toast from 'react-native-simple-toast';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addTaskName } from '../store/CreateTaskActions';

const SetTaskNameKeyboard = ({ route, navigation, addTaskName }) => {

  const taskID = route.params.taskID ? route.params.taskID : null;
  console.log(taskID);
  const [input, setInput] = React.useState('');
  const { primaryColor, secondaryColor, tertiaryColor } = useTheme();
  const { taskCategory,taskType } = route.params;

  const navigateToVerify = () => {
    if (input !== '' && input.length != 0) {
      addTaskName({ taskName: input });
      navigation.navigate('CreateTask', {
        screen: 'SetTaskNameVerification',
        params: { 
          chosenText: input ,
          taskID,
          taskType,
        },
      });
    } else {
      Toast.show('Please enter a task name', Toast.SHORT, Toast.BOTTOM);
    }
  };

  return (
    <View style={styles({ primaryColor }).container}>
      <ConversationCard
        style={{ flex: 1 }}
        avatarText={`What is the name of your ${taskType} task?`}
      />
      <View style={{ flex: 3 }}>
        <View
          style={{
            marginHorizontal: 20,
          }}
        >
          <Input
            style={styles({ secondaryColor, tertiaryColor }).input}
            inputContainerStyle={{ color: secondaryColor }}
            placeholder={`${taskType} name`}
            placeholderTextColor={secondaryColor}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={navigateToVerify}
            value={input}
            autoFocus={true}
          />
        </View>
        <View style={{ alignItems: 'flex-end', marginRight: 25 }}>
          <NextStepButton
            content="Next"
            action={navigateToVerify}
          ></NextStepButton>
        </View>
      </View>
    </View>
  );
};

const styles = ({ primaryColor, secondaryColor, tertiaryColor }) =>
  StyleSheet.create({
    icon: {
      marginTop: 20,
      marginHorizontal: 20,
    },
    container: {
      flex: 1,
      // alignItems: 'stretch',
      justifyContent: 'center',
      backgroundColor: primaryColor,
      flexDirection: 'column',
    },
    input: {
      borderWidth: 2, // size/width of the border
      borderColor: secondaryColor, // color of the border
      color: secondaryColor,
      backgroundColor: tertiaryColor,
      padding: 20,
      borderRadius: 5,
      height: 75,
    },
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addTaskName,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(SetTaskNameKeyboard);
