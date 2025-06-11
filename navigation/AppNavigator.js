import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InicioActividad from '../components/pantallas/InicioActividadComponent';
import PerfilUsuario from '../components/pantallas/PerfilUsuarioComponent';
import { colorPrincipal } from '../components/Estilos';
import Calendario from './Calendario';

const Tab = createBottomTabNavigator();

class AppNavigator extends Component {

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: { backgroundColor: colorPrincipal },
            tabBarActiveTintColor: '#FFFFFF',
            tabBarInactiveTintColor: '#000000',
            tabBarIcon: ({ color, size }) => {
              let icon;
              if (route.name === 'Calendario') icon = 'calendar';
              if (route.name === 'Actividades') icon = 'dumbbell';
              if (route.name === 'Perfil') icon = 'account-circle-outline';
              return <MaterialCommunityIcons name={icon} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Calendario" component={Calendario} />
          <Tab.Screen name="Actividades" component={InicioActividad} />
          <Tab.Screen name="Perfil" component={PerfilUsuario} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppNavigator;
