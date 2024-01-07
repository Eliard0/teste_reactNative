import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Estilo from '../css/acelerometro';

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
        <View style={Estilo.container}>
          <Text style={Estilo.text}>Colhendo dados do sensor acelerometro</Text>
          <Text >x: {x}</Text>
          <Text >y: {y}</Text>
          <Text >z: {z}</Text>
          <View style={Estilo.buttonContainer}>
            <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={Estilo.button}>
              <Text>{subscription ? 'On' : 'Off'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_slow} style={[Estilo.button, Estilo.middleButton]}>
              <Text>Slow</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_fast} style={Estilo.button}>
              <Text>Fast</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

export default Acelerometro