import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Icon,
} from 'react-native';
import { Foundation } from '@expo/vector-icons';
import MyAppText from '../components/MyAppText';
import { useTheme } from '@react-navigation/native';

const InputModeButton = ({ icon, action, onPressIn, onPressOut, isVoice}) => {
  const { tertiaryColor, secondaryColor } = useTheme();
  isVoice = isVoice ? true : false;
  return (
    <TouchableOpacity
      style={styles({ tertiaryColor,isVoice }).button}
      onPress={action? action : () => {}}
      onPressIn={onPressIn ? onPressIn : () => onPressIn}
      onPressOut={onPressOut ? onPressOut : () => {}}
    >
      <Foundation
        style={[styles.icon]}
        name={icon}
        size={45}
        color={secondaryColor}
      />
    </TouchableOpacity>
  );
};

const styles = ({ tertiaryColor, isVoice }) =>
  StyleSheet.create({
    icon: {
      marginTop: 20,
      marginHorizontal: 20,
    },
    button: {
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#740b0f',
      width: 100,
      height: 100,
      backgroundColor: `${isVoice ? '#f2898d' : tertiaryColor}`,
      borderRadius: 100,
    },
  });

export default InputModeButton;
