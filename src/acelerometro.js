import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const Acelerometro = () => {  
    const [{ x, y, z }, setData] = useState({x: 0,  y: 0,  z: 0 });
      const [subscription, setSubscription] = useState(null);
    
      const _slow = () => Accelerometer.setUpdateInterval(1000);
      const _fast = () => Accelerometer.setUpdateInterval(16);
    
      const _subscribe = () => {
        setSubscription(Accelerometer.addListener(setData));
      };
    
      const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
      };
    
      useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
      }, []);
    
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Colhendo dados do sensor acelerometro</Text>
          <Text >x: {x}</Text>
          <Text >y: {y}</Text>
          <Text >z: {z}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
              <Text>{subscription ? 'On' : 'Off'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
              <Text>Slow</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_fast} style={styles.button}>
              <Text>Fast</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

export default Acelerometro

const styles = StyleSheet.create({
  container: {
      marginTop: 250,
    alignItems: 'center',
    justifyContent:'center'
  },

  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  buttonContainer: {
    margin: 40,
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
});
