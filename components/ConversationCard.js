import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MessageBubble from './MessageBubble';
import AvatarComponent from '../assets/avatarSVG';
// import Monster from '../assets/monster.svg';

const redoButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text>Redo</Text>
    </TouchableOpacity>
  );
};

const ConversationCard = ({ avatarText, userText }) => {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={styles.avatar}>
          <AvatarComponent />
        </View>
        <View style={styles.avatar_text}>
          <MessageBubble mine text={avatarText} />
        </View>
      </View>
      {userText && (
        <View style={styles.avatarText}>
          <View>
            <MessageBubble text={userText} />
            {redoButton()}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 180,
    width: 115,
  },
  avatarText: {
    height: 100,
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
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
});

export default ConversationCard;
