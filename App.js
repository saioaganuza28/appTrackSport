import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import InicioActividad from './components/pantallas/InicioActividadComponent';
import PerfilUsuario from './components/pantallas/PerfilUsuarioComponent';

export default function App() {
  return (
    <View style={styles.container}>
      <PerfilUsuario/>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
