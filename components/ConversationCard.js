import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Monster from '../assets/monster.svg';

const ConversationCard = ({avatarText, userText}) => {
    return (<View style={styles.card}>
        <View style={{flex: 6, flexDirection: 'column'}}>
            <Monster/>
            {/* <Text>{avatarText}</Text> */}
            {/* <Text>{userText}</Text> */}
        </View>
    </View>);
}

const styles = StyleSheet.create({
    avatar: {

    },
    card: {
        flex: 3,
        backgroundColor: '#fc9003',
        alignItems: 'stretch',
    },
});

export default ConversationCard;