import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';

const MyAppText = ({ children, alignCenter = true }) => {
  let [fontsLoaded] = useFonts({
    Pangolin_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <Text style={styles(alignCenter).defaultText}>{children}</Text>;
  }
};

const styles = (alignCenter) =>
  StyleSheet.create({
    defaultText: {
      color: '#E9C46A',
      fontFamily: 'Pangolin_400Regular',
      alignSelf: alignCenter ? 'center' : 'flex-start',
    },
  });

export default MyAppText;
