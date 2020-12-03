import React, { useState, useEffect, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Text, View, StyleSheet, Dimensions, Pressable } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import MyAppText from '../components/MyAppText';
import UpcomingTasks from '../components/UpcomingTasks';
import CompletedTasks from '../components/CompletedTasks';
import { connect } from 'react-redux';
import { getCompletedTasks, getUpcomingTasks } from '../database/Utilities/api';

const FirstRoute = ({ activity }) => {
  const { secondaryColor } = useTheme();

  return (
    <View style={[styles.scene, { backgroundColor: secondaryColor }]}>
      <UpcomingTasks activity={activity.activitySelected}></UpcomingTasks>
    </View>
  );
};

const SecondRoute = ({ activity }) => {
  const { secondaryColor } = useTheme();
  return (
    <View style={[styles.scene, { backgroundColor: secondaryColor }]}>
      <CompletedTasks activity={activity.activitySelected}></CompletedTasks>
    </View>
  );
};

const renderTabBar = (props) => {
  return (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#E76F51', height: 7 }}
      style={{ backgroundColor: '#2A9D8F' }}
      labelStyle={{ color: '#E9C46A', fontFamily: 'Pangolin_400Regular' }}
    />
  );
};

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
    console.log('value is ' + value + ' ' + new Date().getMilliseconds());
  });
  return ref.current;
}

const initialLayout = { width: Dimensions.get('window').width };

const ViewTasks = ({ navigation }) => {
  console.log('Rendering');
  const [activitySelected, setActivitSelected] = useState('Chores');
  const isFocused = useIsFocused();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Upcoming' },
    { key: 'second', title: 'Completed' },
  ]);

  useEffect(() => {
    //Update the state you want to be updated
    console.log('Is focused ' + isFocused);
    console.log('activity selected ' + activitySelected);
  }, [isFocused, activitySelected]);

  useEffect(() => {
    //Update the state you want to be updated
    console.log('activity selected ' + activitySelected);
    // let previous = previousActivity
    // let current = activitySelected
    // setPreviousActivity(activitySelected)
    // setActivitSelected("")
    // setActivitSelected(current)
    // setPreviousActivity(previous)
    // if(index==0) {
    //   index=1
    //   setIndex(index)
    // }
    // else if(index==1){
    //   index=0
    //   setIndex(0)
    // }
    // console.log("previous activity "+previousActivity+" "+new Date().getMilliseconds())
    // let previous = activitySelected
    // setActivitSelected("")
    //setTimeout(function(){ setActivitSelected(previous); }, 3000);
  }, [activitySelected]);

  const { primaryColor, tertiaryColor, accentColor } = useTheme();

  const renderScene = ({ route }) => {
    //console.log(route);
    switch (route.key) {
      case 'first':
        return <FirstRoute activity={{ activitySelected }}></FirstRoute>;
      case 'second':
        return <SecondRoute activity={{ activitySelected }}></SecondRoute>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[{ backgroundColor: 'transparent' }, styles.container]}>
        <View style={styles.activityContainer}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={[{ marginVertical: 11 }]}>
              <MaterialIcons
                style={[styles.activityIcon]}
                name="arrow-back"
                size={30}
                color={accentColor}
              />
            </View>
          </Pressable>
          <Pressable
            onPress={async () => {
              setActivitSelected('Chores');
            }}
            android_ripple={{
              color: accentColor,
            }}
            style={{
              backgroundColor:
                activitySelected === 'Chores' ? accentColor : primaryColor,
            }}
          >
            <MaterialCommunityIcons
              style={[styles.activityIcon]}
              name="broom"
              size={65}
              color={tertiaryColor}
            />
            <MyAppText>
              <Text style={styles.activityText}>Chores</Text>
            </MyAppText>
          </Pressable>
          <Pressable
            onPress={async () => {
              setActivitSelected('Hobbies');
            }}
            android_ripple={{
              color: accentColor,
            }}
            style={{
              backgroundColor:
                activitySelected === 'Hobbies' ? accentColor : primaryColor,
            }}
          >
            <FontAwesome5
              name="guitar"
              size={60}
              style={[styles.activityIcon]}
              color={tertiaryColor}
            />
            <MyAppText>
              <Text style={styles.activityText}>Hobbies</Text>
            </MyAppText>
          </Pressable>
          <Pressable
            onPress={async () => {
              setActivitSelected('Homework');
            }}
            android_ripple={{
              color: accentColor,
            }}
            style={{
              backgroundColor:
                activitySelected === 'Homework' ? accentColor : primaryColor,
            }}
          >
            <FontAwesome5
              name="pencil-ruler"
              size={55}
              style={[styles.activityIcon]}
              color={tertiaryColor}
            />
            <MyAppText>
              <Text style={styles.activityText}>Homework</Text>
            </MyAppText>
          </Pressable>
          <Pressable
            onPress={async () => {
              setActivitSelected('Study');
            }}
            android_ripple={{
              color: accentColor,
            }}
            style={{
              backgroundColor:
                activitySelected === 'Study' ? accentColor : primaryColor,
            }}
          >
            <FontAwesome5
              name="book-open"
              size={55}
              style={[styles.activityIcon]}
              color={tertiaryColor}
            />
            <MyAppText>
              <Text style={styles.activityText}>Study</Text>
            </MyAppText>
          </Pressable>
        </View>
        <View style={styles.taskContainer}>
          <MyAppText>
            <Text style={styles.activityHeader}>{activitySelected}</Text>
          </MyAppText>
          {isFocused && <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
          />}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#264653',
  },
  scene: {
    flex: 1,
  },
  activityContainer: {
    width: 75,
    flexDirection: 'column',
  },
  taskContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  activityHeader: {
    fontSize: 55,
  },
  activityIcon: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  activityText: {
    marginBottom: 5,
  },
});

function mapStateToProps(state, ownProps) {
  return {
    activitySelected: state.activitySelected,
  };
}

export default ViewTasks;
//export default connect(mapStateToProps)(ViewTasks);
