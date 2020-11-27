import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button,Icon } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import MyAppText from '../components/MyAppText';

const NextStepButton = ({content, action}) => {
    return (
       <TouchableOpacity style={styles.button} onPress={() => action()}>
            <Text>{content}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    icon: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    button: { 
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:120,
        height:50,
        backgroundColor:'#fff',
    }
});

export default NextStepButton;