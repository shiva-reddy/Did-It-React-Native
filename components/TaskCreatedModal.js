import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Button,Icon,Modal } from 'react-native';
import Monster from '../assets/monsterReact';
import MyAppText from '../components/MyAppText';

const TaskCreatedModal = (modalVisible, navigation,lines) => {
    return (
        <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Monster/>
    {lines.map(line => <MyAppText>{line}</MyAppText>)}
                    <TouchableHighlight
                        style={{ ...styles.openButton, marginTop: 30,backgroundColor: "#2196F3" }}
                        onPress={() => {
                          navigation.navigate('ViewTasks');}}
                        >
                            <Text style={styles.textStyle}>OK!</Text>
                        </TouchableHighlight>
                </View>
            </View>
        </Modal>
      </View>
      );
};

const styles = StyleSheet.create({
    centeredView: {
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

export default TaskCreatedModal;