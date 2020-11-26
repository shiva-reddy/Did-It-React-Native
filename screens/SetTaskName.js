import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';


const SetTaskName = ({ route, navigation }) => {
    const taskCategory = route.params.taskCategory;
    return (
        <View styles={styles.container}>
            <Text>
                {taskCategory.title}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: '#264653',
    },
});

export default SetTaskName;
