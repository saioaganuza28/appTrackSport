import { createStackNavigator } from '@react-navigation/stack';
import CalendarioActividades from '../components/pantallas/CalendarioActividadesComponent';
import ResumenActividad from '../components/pantallas/ResumenActividadComponent';

const Stack = createStackNavigator();

const Calendario = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="CalendarioActividades"
        component={CalendarioActividades}
        options={{ title: 'Calendario' }}
      />
      <Stack.Screen
        name="ResumenActividad"
        component={ResumenActividad}
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default Calendario;
