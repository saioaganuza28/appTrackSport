import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InicioActividad from '../components/pantallas/InicioActividadComponent';
import PerfilUsuario from '../components/pantallas/PerfilUsuarioComponent';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: { backgroundColor: '#fc4c02' },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#000000',
          tabBarIcon: ({ color, size }) => {
            let icon;
            if (route.name === 'Actividades') icon = 'dumbbell';
            if (route.name === 'Perfil') icon = 'account-circle-outline';
            return <MaterialCommunityIcons name={icon} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Actividades" component={InicioActividad} />
        <Tab.Screen name="Perfil" component={PerfilUsuario} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;