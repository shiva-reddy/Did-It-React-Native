import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button,Icon } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import ConversationCard from '../components/ConversationCard';
import MyAppText from '../components/MyAppText';
import NextStepButton from "../components/NextStepButton";
import DropDownPicker from 'react-native-dropdown-picker';


const option = (text, action) => {
    return (
       <TouchableOpacity style={styles.button} onPress={() => action()}>
           <MyAppText>
        <Text style={styles.modeText}>{text}</Text>
          </MyAppText>
       </TouchableOpacity>
    );
};

const SetTaskRecurranceSchedule = ({ route, navigation }) => {
    const [period, setPeriod] = React.useState('month');
    const daysOfMonth = Array.from(Array(30).keys()).map(day => {
        return {label : (day + 1).toString(),value : (day + 1).toString()};
    });

    const [dayOfMonth, setDaysOfMonth] = React.useState('1');
    const [dayOfWeek, setDayOfWeek] = React.useState('Sunday');

    const daysOfWeek = 
    ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday","Saturday"]
    .map(day => {
        return {label : day,value : day};
    });

    return (
        <View style={styles.container}>
            <ConversationCard avatarText="How does the task repeat?"/>
            <View style={{alignSelf: 'stretch',flex: 6,justifyContent: 'space-around',flexDirection: 'row'}}>
                <DropDownPicker
                    items={[
                        {label: 'Month', value: 'month'},
                        {label: 'Week', value: 'week'},
                    ]}
                    defaultValue={period}
                    containerStyle={{height: 40}}
                    style={{backgroundColor: '#fafafa', width: 150}}
                    itemStyle={{justifyContent: 'flex-start'}}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => setPeriod(item.value)}
                />
                {
                    period === 'month'
                    ? <DropDownPicker
                            items={daysOfMonth}
                            defaultValue={dayOfMonth}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa',width: 150}}
                            itemStyle={{justifyContent: 'flex-start'}}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => setDaysOfMonth(item.value)}
                        />
                        : <DropDownPicker
                        items={daysOfWeek}
                        defaultValue={dayOfWeek}
                        containerStyle={{height: 40}}
                        style={{backgroundColor: '#fafafa',width: 150}}
                        itemStyle={{justifyContent: 'flex-start'}}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={item => setDayOfWeek(item.value)}
                    />
                }
            </View>
            <View style={{alignSelf: 'stretch', flexDirection: 'row-reverse',marginBottom: 20}}>
                <NextStepButton content="Next Step" action={() => navigation.navigate("SetTaskTime")}/>
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
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#264653',
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
    modeText: {
        fontSize: 40,
      },
    options: {
        flex: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
});

export default SetTaskRecurranceSchedule;
