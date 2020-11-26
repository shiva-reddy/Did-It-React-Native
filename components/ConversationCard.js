import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MessageBubble from './MessageBubble';
import Monster from '../assets/monsterReact';
// import Monster from '../assets/monster.svg';

const ConversationCard = ({avatarText, userText}) => {
    return (
        <View style={styles.card}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={styles.avatar}>
                    <Monster/>
                </View>
                <View style={styles.avatar_text}>
                    <MessageBubble
                        mine
                        text={avatarText}
                    />
                </View>
            </View>
            {userText &&
                <View style={styles.user_text}>
                    <MessageBubble text={userText}/>
                </View>
            }
        </View>);
}

const styles = StyleSheet.create({
    avatar: {
        height: 180,
        width: 180,
    },
    avatar_text: {
        height: 100,
    },
    user_text: {
        height: 100,
    },
    card: {
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: 400,
        marginTop: 90,
        marginLeft: 10,
    },
});

export default ConversationCard;