import { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { connect } from 'react-redux';
import { guardarActividad } from '../../redux/ActionCreators';
import { stylesInicioActividad, stylesModal, stylesMapa } from '../Estilos';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  guardarActividad: (actividad) => dispatch(guardarActividad(actividad)),
});

class InicioActividad extends Component {
  state = {
    tracking: false,
    tiempo: 0,
    locations: [],
    watchId: null,
    region: null,
    intervalId: null,
    mostrarModal: false,
  };

  iniciarActividad = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se requiere acceso a la ubicación.');
      return;
    }

    this.setState({ tracking: true, tiempo: 0, locations: [] });

    const watchId = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 5,
      },
      this.handleNuevaUbicacion
    );

    const intervalId = setInterval(() => {
      this.setState(prev => ({ tiempo: prev.tiempo + 1 }));
    }, 1000);

    this.setState({ watchId, intervalId });
  };

  detenerActividad = () => {
    const { watchId, intervalId } = this.state;

    if (watchId) watchId.remove();
    if (intervalId) clearInterval(intervalId);

    this.setState({
      watchId: null,
      intervalId: null,
      mostrarModal: true
    });
  };

  confirmarGuardar = () => {
    const { watchId, intervalId, tiempo, locations } = this.state;

    if (watchId) watchId.remove();
    if (intervalId) clearInterval(intervalId);

    const distancia = this.calcularDistancia(locations);
    const promedio = tiempo > 0 ? (distancia / tiempo).toFixed(2) : 0;

    const actividad = {
      tiempo,
      distancia,
      promedio,
      recorrido: locations,
      timestamp: new Date().toISOString()
    };

    this.props.guardarActividad(actividad);

    Alert.alert(
      'Actividad guardada',
      `Tiempo: ${tiempo}s\nDistancia: ${(distancia / 1000).toFixed(2)} km\nPromedio: ${promedio} m/s`
    );

    this.setState({
      tracking: false,
      tiempo: 0,
      locations: [],
      watchId: null,
      intervalId: null,
      mostrarModal: false,
    });
  };

  cancelarGuardado = () => {
    this.setState({
      tracking: false,
      tiempo: 0,
      locations: [],
      watchId: null,
      intervalId: null,
      mostrarModal: false,
    });

    Alert.alert('Actividad descartada');
  };

  handleNuevaUbicacion = (location) => {
    const { coords } = location;
    const nuevaPosicion = {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };

    this.setState(prev => ({
      locations: [...prev.locations, nuevaPosicion],
      region: {
        ...nuevaPosicion,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
    }));
  };

  calcularDistancia = (coords) => {
    if (coords.length < 2) return 0;

    let distancia = 0;
    for (let i = 1; i < coords.length; i++) {
      distancia += this.distanciaEntre(coords[i - 1], coords[i]);
    }
    return distancia;
  };

  distanciaEntre = (p1, p2) => {
    const R = 6371e3;
    const toRad = x => (x * Math.PI) / 180;

    const dLat = toRad(p2.latitude - p1.latitude);
    const dLon = toRad(p2.longitude - p1.longitude);
    const lat1 = toRad(p1.latitude);
    const lat2 = toRad(p2.latitude);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  componentWillUnmount() {
    if (this.state.watchId) this.state.watchId.remove();
    if (this.state.intervalId) clearInterval(this.state.intervalId);
  }

  render() {
    const { tracking, tiempo, region, locations, mostrarModal } = this.state;

    return (
      <View style={stylesInicioActividad.container}>
        <Text style={stylesInicioActividad.title}>
          {tracking ? 'Actividad en curso' : 'List@ para comenzar'}
        </Text>
        <Text style={stylesInicioActividad.subtitle}>
          {tracking
            ? `Tiempo: ${tiempo}s`
            : 'Pulsa el botón para iniciar tu actividad'}
        </Text>

        {region && (
          <MapView
            style={stylesMapa.mapa}
            initialRegion={region}
            region={region}
            showsUserLocation
            followsUserLocation
          >
            {locations.length > 0 && (
              <>
                <Polyline coordinates={locations} strokeWidth={5} strokeColor="blue" />
                <Marker coordinate={locations[0]} title="Inicio" />
              </>
            )}
          </MapView>
        )}

        <TouchableOpacity
          style={stylesInicioActividad.button}
          onPress={tracking ? this.detenerActividad : this.iniciarActividad}
        >
          <Text style={stylesInicioActividad.buttonText}>
            {tracking ? 'DETENER ACTIVIDAD' : 'INICIAR ACTIVIDAD'}
          </Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          visible={mostrarModal}
          animationType="fade"
        >
          <View style={stylesModal.modalFondo}>
            <View style={stylesModal.modalContenido}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
                ¿Deseas guardar la actividad?
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={stylesModal.modalBotonPrincipal} onPress={this.confirmarGuardar}>
                  <Text style={{ color: 'white' }}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[stylesModal.modalBotonSecundario, { backgroundColor: 'gray' }]} onPress={this.cancelarGuardado}>
                  <Text style={{ color: 'white' }}>Descartar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InicioActividad);
