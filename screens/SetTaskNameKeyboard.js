import React from 'react';
import { StyleSheet, Text, TextInput, View, InteractionManager, TouchableOpacity, Button,Icon } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import ConversationCard from '../components/ConversationCard';
import MyAppText from '../components/MyAppText';
import InputModeButton from "../components/InputModeButton";


const SetTaskNameKeyboard = ({navigation}) => {
    const [input, setInput] = React.useState('');

    return (
        <View style={styles.container}>
            <ConversationCard avatarText="Choose your name"/>
            <View style={{flex: 3}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TextInput
                        autoFocus={true}
                        style={styles.input}
                        onChangeText={text => setInput(text)}
                        onSubmitEditing={() => navigation.navigate('CreateTask', {
                            screen: 'SetTaskNameVerification',
                            params: { chosenText: input },
                          })}
                        value={input}
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
      alignItems: 'stretch',
      justifyContent: 'center',
      backgroundColor: '#264653',
    },
    input:{ 
        height: 40,
        width: 300,
        color: '#FFFF',
        borderColor: 'gray',
        borderWidth: 1,
    }
});

export default SetTaskNameKeyboard;
