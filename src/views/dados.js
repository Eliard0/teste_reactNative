import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, Button, View, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import db from '../services/db';

const Dados = () => {
  const [dados, setDados] = useState([]);
  const [recarregar, setRecarregar] = useState(false)

  useEffect(() => {
    buscarDados();
  }, []);

  const buscarDados = () => {
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
  }

  const carregarDados = () => {
    setRecarregar(true);
    buscarDados();
    setRecarregar(false);
  };

  const apagarDados = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM sensor;',
        [],
        (_, result) => {
          setDados(result.rows._array);
        },
        (_, error) => {
          console.log('Error:', error);
        }
      );
    });
    setDados([]);
  }

  if (dados.length === 0) {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text>Não ha dados registrados no banco de dados</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={recarregar} onRefresh={carregarDados} />
        }
      >
        <View style={styles.container}>
          {dados.map(sensor => (
            <Text key={sensor.id} style={styles.text}>
              Nome do sensor: {sensor.nome_sensor}
              {'\n'}
              Dado: {sensor.dado}
            </Text>
          ))}

          <Button
            title='apagar todos os dados'
            onPress={apagarDados}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Dados

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
