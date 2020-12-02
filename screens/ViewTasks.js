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
import {getCompletedTasks, getUpcomingTasks} from '../database/Utilities/api'

const FirstRoute = ({ data }) => {
  const { secondaryColor } = useTheme();

  return (
    <View style={[styles.scene, { backgroundColor: secondaryColor }]}>
      <UpcomingTasks dbData={data}></UpcomingTasks>
    </View>
  );
};

const SecondRoute = ({ data }) => {
  const { secondaryColor } = useTheme();
  console.log("Activity in second route ")
  return (
    <View style={[styles.scene, { backgroundColor: secondaryColor }]}>
      <CompletedTasks dbData={data}></CompletedTasks>
    </View>
  );
};

const renderTabBar = (props) => {
  return (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#E76F51' }}
      style={{ backgroundColor: '#2A9D8F' }}
      labelStyle={{ color: '#E9C46A', fontFamily: 'Pangolin_400Regular' }}
    />
  );
};

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
    console.log("value is "+value+ " "+new Date().getMilliseconds())
  });
  return ref.current;
}

const initialLayout = { width: Dimensions.get('window').width };

const ViewTasks = ({ navigation }) => {

  console.log("Rendering")
  const [activitySelected, setActivitSelected] = useState('Chores');
  const isFocused = useIsFocused()
  const [index, setIndex] = React.useState(0);
  const [previousActivity,setPreviousActivity] = useState("");
  const [dbData, setDBData] =   useState([]);
  const [dbData2, setDBData2] = useState([])
  //const previousActivity = usePrevious(activitySelected)
  const [routes] = React.useState([
    { key: 'first', title:  'Upcoming' },
    { key: 'second', title: 'Completed' },
  ]);


    useEffect(() => {
        //Update the state you want to be updated
        console.log("Is focused "+isFocused)
        console.log("activity selected "+activitySelected)
        
    } , [isFocused, activitySelected])

    useEffect(() => {

      //Update the state you want to be updated
      console.log("activity selected "+activitySelected)
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
      
  } , [activitySelected])

  const { primaryColor, tertiaryColor, accentColor } = useTheme();
  

  


  // const renderScene= SceneMap({
  //   first: FirstRoute,
  //   second: SecondRoute,
  // });

  const renderScene= ({ route }) => {
    //console.log(route);
    switch (route.key) {
      case 'first':
        return <FirstRoute data={dbData}></FirstRoute>;
      case 'second':
        return <SecondRoute data={dbData2}></SecondRoute>;
    }
  }
  
  return (
    <View style={styles.container}>
     
        <View style={[{backgroundColor:'transparent'},styles.container]}>
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
              let result = await getUpcomingTasks('Chores')
              let completed = await getCompletedTasks('Chores')
              let data1 = result.rows
              let data2 = completed.rows
              console.log("Completed tasks " +completed)
              console.log("Upcoming tasks " + result)
              console.log("data is "+data1)
              console.log("data is "+data2)
              setDBData(data1);
              setDBData2(data2);
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
              
              let result = await getUpcomingTasks('Hobbies')
              let completed = await getCompletedTasks('Hobbies')
              let data1 = result.rows
              let data2 = completed.rows
              console.log("Completed tasks " +completed)
              console.log("Upcoming tasks " + result)
              const dataDB = {...data1}
              const dataDB2 = {taskArray: data1}
              console.log("data1 is "+{taskArray:data1})
              console.log("data2 is "+{taskArray:data2})
              setDBData({taskArray:data1});
              setDBData2({taskArray:data2});
              //setActivitSelected('Chores');
            
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
              let result = await getUpcomingTasks('Homework')
              let completed = await getCompletedTasks('Homework')
              console.log("Completed tasks " +completed)
              console.log("Upcoming tasks " + result)
              let data1 = result.rows
              let data2 = completed.rows
              console.log("data1 is "+JSON.stringify(data1))
              console.log("data2 is "+JSON.stringify(data2))
              setDBData({taskArray:data1});
              setDBData2({taskArray:data2});
              //setActivitSelected('Chores');
            
              //setActivitSelected('Hobbies');
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
              let result = await getUpcomingTasks('Study')
              let completed = await getCompletedTasks('Study')
              let data1 = result.rows
              let data2 = completed.rows
              console.log("Completed tasks " +completed)
              console.log("Upcoming tasks " + result)
              console.log("data1 is "+data1)
              console.log("data2 is "+data2)
              setDBData(data1);
              setDBData2(data2);
              //setActivitSelected('Chores');
            
              //setActivitSelected('Hobbies');
              //setActivitSelected('Homework');
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
        <TabView
          navigationState={{ index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}  
        />
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
      activitySelected: state.activitySelected
  };
}

export default ViewTasks;
//export default connect(mapStateToProps)(ViewTasks);
