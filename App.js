import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import InicioActividad from './components/pantallas/InicioActividadComponent';

export default function App() {
  return (
    <View style={styles.container}>
      <InicioActividad/>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
