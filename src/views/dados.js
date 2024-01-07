import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import db from '../services/db';

const Dados = () => {
  const [dados, setDados] = useState([]);

  useEffect(()=>{
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM sensor;',
        [],
        (_, result) => {
          setDados(result.rows._array);
        },
        (_, error) => {
          console.log('Error:', error);
        }
      );
    });
  },[db])

  if (dados.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Não ha dados registrados no banco de dados</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {dados.map(sensor => (
        <Text key={sensor.id} style={styles.text}>
          {sensor.nome_sensor}, {sensor.dado}
        </Text>
      ))}
    </View>
  );
}

export default Dados

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },


});
