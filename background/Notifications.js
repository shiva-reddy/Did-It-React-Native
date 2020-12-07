import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Platform } from 'react-native';


const initialiseNotifications = async () => {

    let token = await registerForPushNotificationsAsync()
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
    return token
    
//     notificationListener = Notifications.addNotificationReceivedListener(notification => {
//             setNotification(notification);
//     });

//     responseListener = Notifications.addNotificationResponseReceivedListener(response => {
//             console.log(response);
// })
}



async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  async function schedulePushNotification(date, title, body) {
    const trigger = date
    const notificationID = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hey! You've got a reminder📬",
        body: `Your task ${title} is due soon at ${body}`,
       
      },
      trigger,
    });
    return notificationID
  }

export {initialiseNotifications,schedulePushNotification}
