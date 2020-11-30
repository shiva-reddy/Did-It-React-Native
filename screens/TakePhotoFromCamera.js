import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import MyAppText from '../components/MyAppText';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

const TakePhotoFromCamera = ({ navigation, route }) => {
  return (
    <View style={[styles.container]}>
      <View
        style={[
          { flexDirection: 'row', backgroundColor: '#264653', marginTop: 15 },
        ]}
      >
        <MyAppText>
          <Text
            style={[
              { flex: 5, backgroundColor: '#264653' },
              styles.headerStyle,
            ]}
          >
            Hey ! You may need to grant permissions from your phone
          </Text>
        </MyAppText>
      </View>
      <View style={[{ flex: 5 }, styles.elementsContainer]}>
        <View style={{ flex: 3, backgroundColor: '#264653' }}>
          <CameraComponent />
        </View>
      </View>
    </View>
  );
};

const CameraComponent = () => {
  console.log('Camera permission ' + hasPermission);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [ratio, setCameraRatio] = useState('4:3');
  const [camera, setCameraObject] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const __savePhoto = () => {};
  const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
    console.log('sdsfds', photo);
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          margin: 10,
        }}
      >
        <ImageBackground
          source={{ uri: photo && photo.uri }}
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',

              justifyContent: 'flex-end',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(0,0,0,0.8)',
              }}
            >
              <TouchableOpacity
                onPress={retakePicture}
                style={{
                  width: 130,
                  height: 50,

                  alignItems: 'center',
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20,
                    padding: 10,
                  }}
                >
                  Re-take
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={savePhoto}
                style={{
                  width: 130,
                  height: 50,

                  alignItems: 'center',
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20,
                    padding: 10,
                  }}
                >
                  Look's good
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const onCameraReady = () => {
    (async () => {
      console.log('camera object ' + camera);
      const ratios = await camera.getSupportedRatiosAsync();
      console.log('Ratios ' + ratios.pop());
      setCameraRatio(ratios.pop());
    })();
  };

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    setHasPermission(null);
  };

  const takePicture = async () => {
    const photo = await camera.takePictureAsync({ skipProcessing: true });
    console.log(photo);
    setPreviewVisible(true);
    //setStartCamera(false)
    setCapturedImage(photo);
  };


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, [hasPermission]);

  console.log('Camera permission ' + hasPermission);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {previewVisible && capturedImage ? (
        <CameraPreview
          photo={capturedImage}
          savePhoto={__savePhoto}
          retakePicture={__retakePicture}
        />
      ) : (
        <Camera
          ref={(ref) => setCameraObject(ref)}
          style={{ flex: 1, margin: 10 }}
          type={type}
          ratio={ratio}
          onCameraReady={onCameraReady}
          useCamera2Api={true}
        >
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              margin: 10,
              flex: 1,
            }}
          >
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                backgroundColor: 'transparent',
              }}
              onPress={() => {
                takePicture();
              }}
            >
              <FontAwesome
                name="camera"
                style={{ color: '#fff', fontSize: 40 }}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#264653',
  },
  headerStyle: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: '100',
  },
  elementsContainer: {
    backgroundColor: '#ecf5fd',
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 0,
    marginTop: 24,
  },
});

export default TakePhotoFromCamera;
