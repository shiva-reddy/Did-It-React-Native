import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';

import Home from './screens/Home';
import ViewTasks from './screens/ViewTasks';
import CreateTask from './screens/CreateTask';

const ViewTaskStack = createStackNavigator();
const RootStack = createStackNavigator();

const viewTaskScreens = () => {
  return (
    <ViewTaskStack.Navigator>
      <ViewTaskStack.Screen
        name="ViewTasksMain"
        component={ViewTasks}
        options={{ headerShown: false }}
      ></ViewTaskStack.Screen>
    </ViewTaskStack.Navigator>
  );
};

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
    <View style={styles.container}>
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
            component={viewTaskScreens}
            options={{
              ...headerStyles,
              title: 'View Tasks',
              headerShown: false,
            }}
          ></RootStack.Screen>
        </RootStack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#264653',
  },
});
