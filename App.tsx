import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onCameraReady = () => {
    console.log('Camera ready')
  };

  const onCameraError = (error) => {
    console.log('Camera error', error);
  };

  return (
    <View style={styles.container}>
      {hasPermission ?
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          onCameraReady={onCameraReady}
          onMountError={onCameraError}
          ref={(ref) => {
            setCamera(ref);
          }}
        /> :
        <Text>No access to camera</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
});
