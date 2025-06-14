import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import LoginComponent from './components/pantallas/LoginComponent';
import AppNavigator from './navigation/AppNavigator';
import { View, ActivityIndicator } from 'react-native';
import { colorPrincipal } from './components/Estilos';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
const store = ConfigureStore();

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, usuarioFirebase => {
      setUser(usuarioFirebase);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colorPrincipal} />
      </View>
    );
  }

  return (
    <Provider store={store}>
      {user ? (<AppNavigator />) : (<LoginComponent />)}
    </Provider>
  );
}
