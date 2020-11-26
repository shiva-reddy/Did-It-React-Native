import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button,Icon } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import MyAppText from '../components/MyAppText';

const InputModeButton = ({icon, action}) => {
    return (
       <TouchableOpacity style={styles.button} onPress={() => action()}>
       <Foundation
            style={[styles.icon]}
            name={icon}
            size={60}
            color="#2A9D8F"
          />
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
        height:120,
        backgroundColor:'#fff',
        borderRadius:100,
    }
});

export default InputModeButton;