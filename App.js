import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import Giroscopio from './src/giroscopio';
import Acelerometro from './src/acelerometro';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Giroscopio/> */}
      <Acelerometro/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
