import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, SafeAreaView, Switch, Text, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import Estilo from '../css/giroscopio'
import db from '../services/db'

const Giroscopio = () => {
  const [giroData, setGiroData] = useState({ x: 0, y: 0, z: 0 });
  const [giro, setGiro] = useState(false);

  useEffect(() => {
    let subscription;

    if (giro) {
      subscription = Gyroscope.addListener(gyroScopeData => {
        setGiroData(gyroScopeData);
      })
    } else {
      subscription?.remove();
    }
    return () => {
      subscription?.remove()
    };
  }, [giro]);

  const ligar = () => {
    setGiro(!giro);
  }

  const guardaDados = () => {
    const dados = giroData
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO sensor (nome_sensor, dado) VALUES (?, ?);',
        ['Giroscopio', JSON.stringify(dados)],
        (_, result) => {
          console.log('Result:', result);
        },
        (_, error) => {
          console.log('Error:', error);
        }
      );
    });
  }

  return (
    <SafeAreaView style={Estilo.container}>
      <Text style={Estilo.titulo}>Ative o botão para acionar o sensor giroscopio</Text>
      <View style={Estilo.botaoLiga}>
        <Switch
          trackColor={{ false: '#767677', true: '81b0ff' }}
          thumbColor={giro ? '#f5dd4b' : ' #f4f4f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={ligar}
          value={giro}
          style={Estilo.switch}
        />
      </View>
      <View style={{
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'red',
        transform: [
          { translateX: giroData.y * 10 },
          { translateY: -giroData.x * 10 },
        ],
      }} />
      <Text style={Estilo.help}>click no botão para registra no banco de dados que o sensor esta funcionando</Text>

      <Button
        title="Guardar dados"
        onPress={guardaDados}
      />
    </SafeAreaView>
  );
};

export default Giroscopio