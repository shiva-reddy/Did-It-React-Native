import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';

const MyAppText = ({ children }) => {
  let [fontsLoaded] = useFonts({
    Pangolin_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <Text style={styles.defaultText}>{children}</Text>;
  }
};

const styles = StyleSheet.create({
  defaultText: { color: '#E9C46A', fontFamily: 'Pangolin_400Regular' },
});

export default MyAppText;
