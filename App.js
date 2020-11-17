import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';

import Home from './screens/Home';
import ViewTasks from './screens/ViewTasks';
import CreateTask from './screens/CreateTask';

//const MainTaskStack = createStackNavigator();
const RootStack = createStackNavigator();

export default function App() {
  const headerStyles = {
    headerStyle: {
      backgroundColor: '#264653',
    },
    headerTintColor: '#F4A261',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  return (
    // <View style={styles.container}>
    //   <StatusBar style="auto" />
    //   <Home></Home>
    // </View>

    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        ></RootStack.Screen>
        <RootStack.Screen
          name="CreateTask"
          component={CreateTask}
          options={{ ...headerStyles, title: 'Create Tasks' }}
        ></RootStack.Screen>
        <RootStack.Screen
          name="ViewTasks"
          component={ViewTasks}
          options={{ ...headerStyles, title: 'View Tasks' }}
        ></RootStack.Screen>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#264653',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
