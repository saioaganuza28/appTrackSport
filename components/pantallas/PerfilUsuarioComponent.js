import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { stylesPerfilUsuario } from '../Estilos';
import { auth } from '../../firebase/firebase';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';


const PerfilUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [edad, setEdad] = useState('');
  const [fotoUri, setFotoUri] = useState(null);

  const db = getDatabase();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      const userRef = ref(db, `usuarios/${userId}`);
      get(userRef)
        .then(snapshot => {
          if (snapshot.exists()) {
            const datos = snapshot.val();
            setNombre(datos.nombre || '');
            setAltura(datos.altura || '');
            setPeso(datos.peso || '');
            setEdad(datos.edad || '');
            setFotoUri(datos.fotoUri || null);
          }
        })
        .catch(error => {
          console.error(error);
          Alert.alert('Error', 'No se pudieron cargar los datos');
        });
    }
  }, [userId]);

  const seleccionarFoto = () => {
    Alert.alert('Selecciona una opción', '', [
      { text: 'Cámara', onPress: abrirCamara },
      { text: 'Galería', onPress: abrirGaleria },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const abrirCamara = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permiso para acceder a la cámara denegado');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]) {
      setFotoUri(result.assets[0].uri);
    }
  };

  const abrirGaleria = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets?.[0]) {
      setFotoUri(result.assets[0].uri);
    }
  };

  const subirDatosAFirebase = async () => {
    if (!userId) {
      Alert.alert('Error', 'Usuario no autenticado');
      return;
    }

    try {
      await set(ref(db, 'usuarios/' + userId), {
        nombre,
        altura,
        peso,
        edad,
        fotoUri,
      });
      Alert.alert('Éxito', 'Datos guardados correctamente');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudieron guardar los datos');
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={stylesPerfilUsuario.container}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity onPress={seleccionarFoto}>
            <Image
              source={fotoUri ? { uri: fotoUri } : require('./imagenes/avatar-placeholder.png')}
              style={stylesPerfilUsuario.avatar}
            />
            <Text style={stylesPerfilUsuario.editText}>Editar foto</Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Nombre de usuario"
            value={nombre}
            onChangeText={setNombre}
            style={stylesPerfilUsuario.input}
          />
          <TextInput
            placeholder="Altura (cm)"
            value={altura}
            onChangeText={setAltura}
            keyboardType="numeric"
            style={stylesPerfilUsuario.input}
          />
          <TextInput
            placeholder="Peso (kg)"
            value={peso}
            onChangeText={setPeso}
            keyboardType="numeric"
            style={stylesPerfilUsuario.input}
          />
          <TextInput
            placeholder="Edad"
            value={edad}
            onChangeText={setEdad}
            keyboardType="numeric"
            style={stylesPerfilUsuario.input}
          />

          <TouchableOpacity style={stylesPerfilUsuario.button} onPress={subirDatosAFirebase}>
            <Text style={stylesPerfilUsuario.buttonText}>GUARDAR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={stylesPerfilUsuario.buttonType2} onPress={handleLogout}>
            <Text style={stylesPerfilUsuario.buttonTextType2}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
  );
};

export default PerfilUsuario;
