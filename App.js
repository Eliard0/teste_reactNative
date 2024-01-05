import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from 'react';
import { Button, SafeAreaView, StyleSheet,  Switch,  Text, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';

export default function App() {
  const [ gyroData, setGyroData ] = useState({x:0, y:0, z:0});
  const [ gyro, setGyro ] = useState(false);

  useEffect(()=>{
    let subscription;

    if(gyro){
       subscription = Gyroscope.addListener(gyroScopeData =>{
        setGyroData(gyroScopeData);
      })
    }else{
      subscription?.remove();
    }
    return () => {
      subscription?.remove()
    };
  }, [gyro]);

  const ligar = () => {
    setGyro(!gyro);
  }
  
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>Ative o botão para acionar o sensor giroscopio</Text>
        <View style={styles.botaoLiga}>
          <Switch 
          trackColor={{false: '#767677', true: '81b0ff'}}
          thumbColor={gyro ? '#f5dd4b': ' #f4f4f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={ligar}
          value={gyro}
          style={styles.switch}
        />
        </View>
        <View style={{
          width:100, 
          height: 100, 
          borderRadius: 50,
          backgroundColor: 'red',
          transform:[
            {translateX: gyroData.y * 10},
            {translateY: -gyroData.x * 10},
          ],
          }} />
        <Text style={styles.help}>click no botão para registra no banco de dados que o sensor esta funcionando</Text>

          <Button
          title="concluido"
          />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 80,
  },

  botaoLiga:{
    marginBottom: 60,
    marginTop: 64
  },

  switch:{
    transform:[{scaleX: 1.5}, {scaleY: 1.5}]
  },

  help: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 40,
  },
});
