import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import InicioActividad from './Componentes/InicioActividadComponent';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
const store = ConfigureStore();
export default function App() {
  return (
    <Provider store={store}>
      {/* <SafeAreaProvider> */}
        <View style={styles.container}>
          <InicioActividad />
          <StatusBar style="auto" />
        </View>
      {/* </SafeAreaProvider> */}
    </Provider>)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
