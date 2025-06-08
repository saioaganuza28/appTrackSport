import { Component } from 'react';
import {
  Text, TextInput, TouchableOpacity, Image,
  Alert, Keyboard, TouchableWithoutFeedback, ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { stylesPerfilUsuario } from '../Estilos';
import { connect } from 'react-redux';
import { cargarDatosUsuario, actualizarDatosUsuario } from '../../redux/ActionCreators';
import { auth } from '../../firebase/firebase';

const mapStateToProps = state => {
  return {
    datos: state.user.datos,
    isLoading: state.user.isLoading,
    errMess: state.user.errMess
  }
}

const mapDispatchToProps = dispatch => ({
  cargarDatosUsuario: () => dispatch(cargarDatosUsuario()),
  actualizarDatosUsuario: (nombre, altura, peso, edad, fotoUri) => dispatch(actualizarDatosUsuario(nombre, altura, peso, edad, fotoUri))
});

class PerfilUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      altura: '',
      peso: '',
      edad: '',
      fotoUri: null
    };
  }

  componentDidMount() {
    this.props.cargarDatosUsuario();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datos !== this.props.datos) {
      const { nombre, altura, peso, edad, fotoUri } = this.props.datos;
      this.setState({ nombre, altura, peso, edad, fotoUri });
    }
  }

  seleccionarFoto = () => {
    Alert.alert('Selecciona una opción', '', [
      { text: 'Cámara', onPress: this.abrirCamara },
      { text: 'Galería', onPress: this.abrirGaleria },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  abrirCamara = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permiso para acceder a la cámara denegado');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ quality: 1 });
    if (!result.canceled && result.assets?.[0]) {
      this.setState({ fotoUri: result.assets[0].uri });
    }
  };

  abrirGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 1 });
    if (!result.canceled && result.assets?.[0]) {
      this.setState({ fotoUri: result.assets[0].uri });
    }
  };

  guardarDatos = () => {
    const { nombre, altura, peso, edad, fotoUri } = this.state;
    this.props.actualizarDatosUsuario(nombre, altura, peso, edad, fotoUri);
    Alert.alert('Éxito', 'Datos guardados correctamente');
  };

  handleLogout = () => {
    auth.signOut();
  };

  render() {
    const { nombre, altura, peso, edad, fotoUri } = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={stylesPerfilUsuario.container} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={this.seleccionarFoto}>
            <Image
              source={fotoUri ? { uri: fotoUri } : require('./imagenes/avatar-placeholder.png')}
              style={stylesPerfilUsuario.avatar}
            />
            <Text style={stylesPerfilUsuario.editText}>Editar foto</Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Nombre de usuario"
            value={nombre}
            onChangeText={text => this.setState({ nombre: text })}
            style={stylesPerfilUsuario.input}
          />
          <TextInput
            placeholder="Altura (cm)"
            value={altura}
            onChangeText={text => this.setState({ altura: text })}
            keyboardType="numeric"
            style={stylesPerfilUsuario.input}
          />
          <TextInput
            placeholder="Peso (kg)"
            value={peso}
            onChangeText={text => this.setState({ peso: text })}
            keyboardType="numeric"
            style={stylesPerfilUsuario.input}
          />
          <TextInput
            placeholder="Edad"
            value={edad}
            onChangeText={text => this.setState({ edad: text })}
            keyboardType="numeric"
            style={stylesPerfilUsuario.input}
          />

          <TouchableOpacity style={stylesPerfilUsuario.button} onPress={this.guardarDatos}>
            <Text style={stylesPerfilUsuario.buttonText}>GUARDAR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={stylesPerfilUsuario.buttonType2} onPress={this.handleLogout}>
            <Text style={stylesPerfilUsuario.buttonTextType2}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PerfilUsuario);
