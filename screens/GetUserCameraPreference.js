import React, {useState } from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableHighlight } from 'react-native';
import ConversationCard from '../components/ConversationCard';
import { Ionicons } from '@expo/vector-icons';


const GetUserCameraPreference = ({ route,navigation }) => {

    console.log("Rerendering")
    //const [modalVisible, setModalVisible] = useState(false);

    // const TaskCompletedModal = (modalVisible) => {
    //     //console.log("Modal visible status "+modelVisible)
        
    //     console.log("Modal visible status "+modalVisible)
        
    //     console.log("Model visible status "+JSON.stringify(route.params))
    
    //     return (
    //       <View style={styles.centeredView}>
    //         <Modal
    //           animationType="slide"
    //           transparent={true}
    //           visible={modalVisible}
    //           onRequestClose={() => {
    //             Alert.alert("Modal has been closed.");
    //           }}
    //         >
    //           <View style={styles.centeredView}>
    //             <View style={styles.modalView}>
    //             <Ionicons name="md-checkmark-circle" size={32} color="green" />
    //               <Text style={styles.modalText}>Yay! You have completed the task. Great Job</Text>
    //               <TouchableHighlight
    //                 style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
    //                 onPress={() => {
    //                   setModalVisible(!modalVisible);
    //                 }}
    //               >
    //                 <Text style={styles.textStyle}>Hide Modal</Text>
    //               </TouchableHighlight>
    //             </View>
    //           </View>
    //         </Modal>
      
    //         <TouchableHighlight
    //           style={styles.openButton}
    //           onPress={() => {
    //             setModalVisible(true);
    //           }}
    //         >
    //           <Text style={styles.textStyle}>Show Modal</Text>
    //         </TouchableHighlight>
    //       </View>
    //     );
    // };
    
    
 
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
                        onPress = {()=> navigation.navigate('TakePhotoFromCamera')}
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
