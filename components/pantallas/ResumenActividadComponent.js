import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

class ResumenActividad extends Component {
  render() {
    const { actividad } = this.props.route.params;
    const recorrido = actividad.recorrido || [];

    const region = recorrido.length > 0
      ? {
          ...recorrido[0],
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }
      : null;

    return (
      <View style={{ flex: 1, padding: 10 }}>
        {region && (
          <MapView style={{ height: 300 }} initialRegion={region}>
            <Polyline coordinates={recorrido} strokeWidth={5} strokeColor="blue" />
          </MapView>
        )}
        <Text style={{ paddingTop: 20, paddingBottom: 10}}>📅 Fecha: {actividad.timestamp?.split('T')[0]}</Text>
        <Text style={{ marginTop: 10 }}>⏱ Tiempo: {actividad.tiempo}s</Text>
        <Text style={{ paddingTop: 5}}>📏 Distancia: {(actividad.distancia / 1000).toFixed(2)} km</Text>
        <Text style={{ paddingTop: 5}}>⚡ Promedio: {actividad.promedio} m/s</Text>
      </View>
    );
  }
}

export default ResumenActividad;
