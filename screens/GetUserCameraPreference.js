import React, {useState } from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableHighlight } from 'react-native';
import ConversationCard from '../components/ConversationCard';
import { Ionicons } from '@expo/vector-icons';


const GetUserCameraPreference = ({ route,navigation }) => {

    console.log("Rerendering") 
    
    const taskID = route.params.taskID
 
    return (
        <View style={styles.container}>
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
                        onPress = {()=> setModalVisible(true) }
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
