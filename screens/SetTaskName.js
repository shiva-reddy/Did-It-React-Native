import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight,Button,Icon } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import ConversationCard from '../components/ConversationCard';
import MyAppText from '../components/MyAppText';
import InputModeButton from "../components/InputModeButton";
import TaskCreatedModal from "../components/TaskCreatedModal";
import Monster from '../assets/monsterReact';


const SetTaskName = ({ route, navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Monster/>
                    <MyAppText>You're all set</MyAppText>
                    <MyAppText>I have created the task for you</MyAppText>
                </View>
            </View>
            {/* {TaskCreatedModal(true)} */}
            {/* <ConversationCard avatarText="Choose your name"/>
            <View style={{flex: 3, flexDirection: 'row'}}>
                <View style={styles.options}>
                    <InputModeButton icon="microphone" action={() => navigation.navigate("SetTaskRecurranceSchedule")}/>
                    <InputModeButton icon="pencil" action={() => navigation.navigate("SetTaskRecurranceSchedule")}/>
                </View>
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#264653',
    },
    button: { 
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:120,
        height:120,
        backgroundColor:'#fff',
        borderRadius:100,
    },
    options: {
        flex: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
    ,centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        height: 500,
        width: 350,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});

export default SetTaskName;
