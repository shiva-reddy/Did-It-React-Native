// Import react
import React from 'react';

// Import react-native components
import { StyleSheet, View, Text, Image } from 'react-native';

import { useTheme } from '@react-navigation/native';

// Import react-native-svg
// from 'https://github.com/react-native-community/react-native-svg'
import Svg, { Path } from 'react-native-svg';

// Import react-native-size-matters
// from 'https://github.com/nirsky/react-native-size-matters'
import { moderateScale } from 'react-native-size-matters';

import MyAppText from '../components/MyAppText';

// Props info list
// 1. mine (bool) => renders blue bubble on right
// 2. text (string) => renders text message
// 3. image (image file) => renders image inside bubble

// Declare component
const MessageBubble = (props) => {
  const { tertiaryColor, secondaryColor, accentColor } = useTheme();

  return (
    <View style={[styles.message, props.mine ? styles.mine : styles.not_mine]}>
      <View
        style={[
          styles.cloud,
          {
            backgroundColor: props.mine ? tertiaryColor : accentColor,
          },
        ]}
      >
        {props.image ? (
          <Image
            style={{ alignSelf: props.mine ? 'flex-start' : 'flex-end' }}
            borderRadius={10}
            source={props.image}
          />
        ) : null}
        {props.text ? (
          <MyAppText>
            <Text
              style={[
                styles.text,
                {
                  color: secondaryColor,
                },
              ]}
            >
              {props.text}
            </Text>
          </MyAppText>
        ) : null}
        <View
          style={[
            styles.arrow_container,
            props.mine
              ? styles.arrow_left_container
              : styles.arrow_right_container,
          ]}
        >
          <Svg
            style={props.mine ? styles.arrow_left : styles.arrow_right}
            width={moderateScale(15.5, 0.6)}
            height={moderateScale(17.5, 0.6)}
            viewBox="32.484 17.5 15.515 17.5"
            enable-background="new 32.485 17.5 15.515 17.5"
          >
            <Path
              d={
                props.mine
                  ? 'M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z'
                  : 'M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z'
              }
              fill={props.mine ? tertiaryColor : accentColor}
              x="0"
              y="0"
            />
          </Svg>
        </View>
      </View>
    </View>
  );
};

export default MessageBubble;

const styles = StyleSheet.create({
  message: {
    flexDirection: 'row',
    marginVertical: moderateScale(7, 2),
  },
  mine: {
    marginLeft: 20,
  },
  not_mine: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  cloud: {
    maxWidth: moderateScale(200, 1.5),
    paddingHorizontal: moderateScale(10, 1.5),
    paddingTop: moderateScale(5, 1.5),
    paddingBottom: moderateScale(7, 1.5),
    borderRadius: 20,
  },
  text: {
    paddingTop: 3,
    fontSize: 17,
    lineHeight: 22,
  },
  arrow_container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1,
  },
  arrow_left_container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  arrow_right_container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  arrow_left: {
    left: moderateScale(-6, 0.5),
  },
  arrow_right: {
    right: moderateScale(-6, 0.5),
  },
});
