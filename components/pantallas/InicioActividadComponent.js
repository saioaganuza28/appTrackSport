import { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { stylesInicioActividad } from '../Estilos';


class InicioActividad extends Component {
  handleStart = () => {
    console.log('Actividad iniciada');
  };

  render() {
    return (
      <View style={stylesInicioActividad.container}>
        <Text style={stylesInicioActividad.title}>Listo para comenzar</Text>
        <Text style={stylesInicioActividad.subtitle}>Pulsa el botón para iniciar tu actividad</Text>

        <TouchableOpacity style={stylesInicioActividad.button} onPress={this.handleStart}>
          <Text style={stylesInicioActividad.buttonText}>INICIAR ACTIVIDAD</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default InicioActividad;