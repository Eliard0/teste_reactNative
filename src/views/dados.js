import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Dados = () => {  
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Ola mundo</Text>
        </View>
      );
    }

export default Dados

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
});
