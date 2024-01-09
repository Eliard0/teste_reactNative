import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import Estilo from '../css/dados'
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
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={recarregar} onRefresh={carregarDados} />
          }
        >
          <View style={[Estilo.text, Estilo.container]}>
            <Text>Não ha dados registrados no banco de dados</Text>
            <Text>Caso já tenha guardado algum dado do sensor araste a tela de cima para baixo para atualizar</Text>
          </View>
        </ScrollView>
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
        <View style={Estilo.container}>
          {dados.map(sensor => (
            <Text key={sensor.id} style={Estilo.text}>
              Nome do sensor: {sensor.nome_sensor}
              {'\n'}
              Dado: {sensor.dado}
            </Text>
          ))}
          <TouchableOpacity
            onPress={apagarDados}
            style={Estilo.buttonApagarDados}
          >
            <Text style={Estilo.textButton}>Apagar todos os dados'</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Dados
