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
import { MaterialIcons } from '@expo/vector-icons';

const NextStepButton = ({ content, action }) => {
  const { secondaryColor, tertiaryColor } = useTheme();

  return (
    <TouchableOpacity
      style={styles({ tertiaryColor }).button}
      onPress={() => action()}
    >
      <MyAppText>
        <Text style={{ fontSize: 18 }}>{content}</Text>
        {/* <MaterialIcons name="navigate-next" size={30} color={secondaryColor} /> */}
      </MyAppText>
    </TouchableOpacity>
  );
};

const styles = ({ tertiaryColor }) =>
  StyleSheet.create({
    icon: {
      marginTop: 20,
      marginHorizontal: 20,
    },
    button: {
      borderWidth: 1,
      borderColor: tertiaryColor,
      alignItems: 'center',
      justifyContent: 'center',
      width: 150,
      height: 50,
      borderRadius: 100,
      flexDirection: 'row-reverse',
      backgroundColor: tertiaryColor,
    },
  });

export default NextStepButton;
