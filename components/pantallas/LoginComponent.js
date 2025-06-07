import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { stylesInicioActividad } from '../Estilos';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';


const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Campos requeridos', 'Por favor completa todos los campos.');
      return;
    }

    if (isRegistering) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => Alert.alert('Registro exitoso'))
        .catch(error => Alert.alert('Error al registrarse', error.message));
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .catch(error => Alert.alert('Error al iniciar sesión', error.message));
    }
  };

  return (
    <View style={stylesInicioActividad.container}>
      <Text style={stylesInicioActividad.title}>{isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}</Text>
      <Text style={stylesInicioActividad.subtitle}>
        {isRegistering ? 'Completa los datos para registrarte' : 'Ingresa tu correo y contraseña'}
      </Text>

      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', width: '100%', marginBottom: 20, padding: 10, borderRadius: 10 }}
        placeholder="Correo"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', width: '100%', marginBottom: 30, padding: 10, borderRadius: 10 }}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={stylesInicioActividad.button} onPress={handleSubmit}>
        <Text style={stylesInicioActividad.buttonText}>
          {isRegistering ? 'REGISTRARSE' : 'ENTRAR'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)} style={{ marginTop: 20 }}>
        <Text style={{ color: '#666', textDecorationLine: 'underline' }}>
          {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginComponent;