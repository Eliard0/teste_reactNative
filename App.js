import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Giroscopio from './src/views/giroscopio';
import Acelerometro from './src/views/acelerometro';
import Dados from './src/views/dados';

const Tab = createBottomTabNavigator();

export default props => (
  <>
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#f0f",
          labelStyle: { fontSize: 15, marginBottom: 4 }
        }}
        initialRouteName='Giroscopio'>
        <Tab.Screen name="Giroscopio" component={Giroscopio} options={{
          tabBarIcon: () => (
            <Ionicons name="compass-outline" color="black" size={30} />
          ),
        }} />
        <Tab.Screen name="Acelerometro" component={Acelerometro} options={{
          tabBarIcon: () => (
            <Ionicons name="speedometer-outline" size={24} color="black" />
          ),
        }} />
        <Tab.Screen name="Dados" component={Dados} options={{
          tabBarIcon: () => (
            <AntDesign name="save" size={25} color="black" />
          ),
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
