import React, {useState,useEffect } from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableHighlight } from 'react-native';
import ConversationCard from '../components/ConversationCard';
import { Ionicons } from '@expo/vector-icons';
import TaskCreatedModal from "../components/TaskCreatedModal";


const GetUserCameraPreference = ({ route,navigation }) => {
    
    const [isVisible, setIsVisible] = useState(false);

    const taskID = route.params.taskId;
 
    return (
        <View style={styles.container}>
           {TaskCreatedModal(isVisible, navigation,["You're all set", "I have created the task for you"])}
            <View style={{flex:4}}>

            <ConversationCard avatarText="Do you want to add a picture to the task before marking it as done?"/>
            </View>
            <View style={{flex:2,flexDirection: 'column', alignSelf:'center', width:200}}>
                <View style={[{  margin:10, flexDirection:'row', width:'100%', justifyContent:'center'  }]}>
                    <Button
                        title="Yes"
                        color="#000"
                        backgroundColor='#FFF'
                        onPress = {()=> navigation.navigate('TakePhotoFromCamera',{taskID:taskID})}
                    />
                    </View>
                    <View style={[{ width:200, flexDirection:'row', margin:10, justifyContent:'center'}]}>
                    <Button
                        onPress = {()=> {
                            setIsVisible(!isVisible);
                            console.log("Pressed" + isVisible);
                        }}
                        title="No "
                        color="#000"
                        backgroundColor='#FFF'
                    />
                    </View>
              </View>
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
      
      justifyContent: 'center',
      backgroundColor: '#264653',
      flexDirection:'column'
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
});





export default GetUserCameraPreference;
