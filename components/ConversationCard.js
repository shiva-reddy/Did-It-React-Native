import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MessageBubble from './MessageBubble';
import AvatarComponent from '../assets/avatarSVG';
// import Monster from '../assets/monster.svg';
import { useTheme } from '@react-navigation/native';
import MyAppText from '../components/MyAppText';

const redoButton = (redoAction, taskCategory) => {
  const { secondaryColor, tertiaryColor } = useTheme();
  return (
    <TouchableOpacity
      style={styles({ secondaryColor, tertiaryColor }).button}
      onPress={() => redoAction(taskCategory)}
    >
      <MyAppText>
        <Text style={{ color: tertiaryColor }}>Redo</Text>
      </MyAppText>
    </TouchableOpacity>
  );
};

const ConversationCard = ({
  avatarText,
  userText,
  redoAction,
  taskCategory,
}) => {
  //const { secondaryColor, tertiaryColor } = useTheme();

  return (
    <View style={styles({}).card}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={styles({}).avatar}>
          <AvatarComponent />
        </View>
        <View style={styles({}).avatarText}>
          <MessageBubble mine text={avatarText} />
        </View>
      </View>
      {userText && (
        <View style={styles({}).avatarText}>
          <View>
            <MessageBubble text={userText} />
            {redoButton(redoAction, taskCategory)}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = ({ secondaryColor, tertiaryColor }) =>
  StyleSheet.create({
    avatar: {
      height: 180,
      width: 115,
    },
    avatarText: {
      height: 100,
      marginHorizontal: 10,
      marginBottom: 30,
    },
    user_text: {
      flex: 2,
      height: 100,
    },
    card: {
      flex: 6,
      flexDirection: 'column',
      width: 400,
      marginTop: 90,
      marginLeft: 10,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 80,
      height: 50,
      alignSelf: 'center',
      backgroundColor: secondaryColor,
      borderRadius: 30,
      marginTop: 20,
    },
  });

export default ConversationCard;
