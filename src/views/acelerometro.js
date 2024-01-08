import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Button, SafeAreaView } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Estilo from '../css/acelerometro';
import db from '../services/db';


const Acelerometro = () => {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);

  Accelerometer.setUpdateInterval(4000);

  const _ligado = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _desligado = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _ligado();
    return () => _desligado();
  }, []);

  const guardaDados = () => {
    const dados = {x, y, z}
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO sensor (nome_sensor, dado) VALUES (?, ?);',
        ['Acelerometro', JSON.stringify(dados)],
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
    <View style={Estilo.container}>
      <Text style={Estilo.text}>Colhendo dados do sensor acelerometro</Text>
      <Text style={Estilo.valorX}>X: {x}</Text>
      <Text style={Estilo.valorY}>Y: {y}</Text>
      <Text style={Estilo.valorZ}>Z: {z}</Text>

      <TouchableOpacity onPress={subscription ? _desligado : _ligado} style={Estilo.buttonLigadoDesligado}>
        <Text>{subscription ? 'LIGADO' : 'DESLIGADO'}</Text>
      </TouchableOpacity>

      <Button
        title="Guardar dados"
        onPress={guardaDados}
      />
    </View>
  );
}

export default Acelerometro