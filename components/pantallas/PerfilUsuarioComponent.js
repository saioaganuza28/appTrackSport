import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, stylesPerfilUsuarioheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { stylesPerfilUsuario } from '../Estilos';
// import storage from '@react-native-firebase/storage';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
// import { stylesPerfilUsuarioPerfilUsuario } from '../Estilos';

const PerfilUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [edad, setEdad] = useState('');
  const [fotoUri, setFotoUri] = useState(null);

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
    if (!result.didCancel && result.assets?.[0]) {
      setFotoUri(result.assets[0].uri);
    }
  };

//   const subirDatosAFirebase = async () => {
//     try {
//       const userId = auth().currentUser?.uid;
//       if (!userId) {
//         Alert.alert('Error', 'Usuario no autenticado');
//         return;
//       }

//       let fotoUrl = null;

//       if (fotoUri) {
//         const path = `usuarios/${userId}/perfil.jpg`;
//         await storage().ref(path).putFile(fotoUri);
//         fotoUrl = await storage().ref(path).getDownloadURL();
//       }

//       await firestore().collection('usuarios').doc(userId).set({
//         nombre,
//         altura,
//         peso,
//         edad,
//         fotoUrl,
//       });

//       Alert.alert('Éxito', 'Datos guardados correctamente');
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'No se pudieron guardar los datos');
//     }
//   };

  return (
    <View style={stylesPerfilUsuario.container}>
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

      <TouchableOpacity style={stylesPerfilUsuario.button} onPress={console.log('subirDatosAFirebase')}>
        <Text style={stylesPerfilUsuario.buttonText}>GUARDAR</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PerfilUsuario;