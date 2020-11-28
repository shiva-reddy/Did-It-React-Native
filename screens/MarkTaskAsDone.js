import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, Button } from 'react-native';
import MyAppText from '../components/MyAppText';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const BackButton = ({ navigation }) => {
  return (
    <Pressable
    //onPress={navigation.goBack()}
    >
      <View style={[{ marginVertical: 15 }]}>
        <MaterialIcons name="arrow-back" size={30} color="#E76F51" />
      </View>
    </Pressable>
  );
};

function LogoTitle() {
  return (
    <Image
      source={require('../assets/splash.png')}
      fadeDuration={0}
      style={{ width: 50, height: 50 }}
    />
  );
}

const ViewDetailedTask = ({ navigation, route }) => {
  console.log('route params ' + JSON.stringify(route));
  const taskName = route.params.name;
  const taskDeadline = route.params.deadline;
  const taskDescription = route.params.description;
  const taskIsRecurring = route.params.isRecurring;

  console.log(
    taskName +
      ' ' +
      taskDeadline +
      ' ' +
      taskDescription +
      ' ' +
      taskIsRecurring,
  );

  return (
    <View style={[styles.container]}>
      <View style={[{ justifyContent: 'flex-end', flexDirection: 'row' }]}>
        <Entypo name="trash" size={30} color="#FFF" />
      </View>
      <View
        style={[
          { flexDirection: 'row', backgroundColor: '#EE2C38', marginTop: 15 },
        ]}
      >
        <Text
          style={[{ flex: 5, backgroundColor: '#264653' }, styles.headerStyle]}
        >
          {taskName}
        </Text>
      </View>
      <View style={[{ flex: 1 }, styles.elementsContainer]}>
        <View style={{ flex: 3, backgroundColor: '#264653' }}>
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <View
              style={{ width: '50%', height: 50, backgroundColor: '#264653' }}
            >
              <MyAppText>
                <Text>Deadline</Text>
              </MyAppText>
            </View>
            <View
              style={{ width: '40%', height: 50, backgroundColor: '#264653' }}
            >
              <MyAppText>
                <Text>{taskDeadline}</Text>
              </MyAppText>
            </View>
          </View>
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <View
              style={{ width: '50%', height: 50, backgroundColor: '#264653' }}
            >
              <MyAppText>
                <Text>Created Date</Text>
              </MyAppText>
            </View>
            <View
              style={{ width: '40%', height: 50, backgroundColor: '#264653' }}
            >
              <MyAppText>
                <Text>{taskDeadline}</Text>
              </MyAppText>
            </View>
          </View>
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <View
              style={{ width: '50%', height: 50, backgroundColor: '#264653' }}
            >
              <MyAppText>
                <Text>Does the Task Repeat ?</Text>
              </MyAppText>
            </View>
            <View
              style={{ width: '40%', height: 50, backgroundColor: '#264653' }}
            >
              <MyAppText>
                <Text>{taskIsRecurring}</Text>
              </MyAppText>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: '#264653', flexDirection: 'row' }}>
          <View style={[{ flex: 1, flexDirection: 'row' }]}>
            <Foundation
              style={styles.actionIcon}
              name="pencil"
              size={30}
              color="#E76F51"
            />
          </View>
          <View style={[{ justifyContent: 'flex-end' }]}>
            <Pressable
              onPress={() => {
                navigation.navigate('GetUserCameraPreference');
              }}
            >
              <Entypo name="check" size={30} color="#E76F51" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#264653',
  },
  headerStyle: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: '100',
  },
  elementsContainer: {
    backgroundColor: '#ecf5fd',
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
    marginTop: 24,
  },
});

export default ViewDetailedTask;
