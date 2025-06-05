import { Component } from 'react';
import Constants from 'expo-constants';
import { Platform, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    DrawerContentScrollView, DrawerItemList
} from '@react-navigation/drawer';
import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerActions } from '@react-navigation/native';
import QuienesSomos from './QuienesSomosComponent'; 

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// const mapStateToProps = state => {
//     return {
//         excursiones: state.excursiones,
//         comentarios: state.comentarios,
//         cabeceras: state.cabeceras,
//         actividades: state.actividades
//     }
// }

// const mapDispatchToProps = dispatch => ({
//     fetchExcursiones: () => dispatch(fetchExcursiones()),
//     fetchComentarios: () => dispatch(fetchComentarios()),
//     fetchCabeceras: () => dispatch(fetchCabeceras()),
//     fetchActividades: () => dispatch(fetchActividades()),
// })

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <SafeAreaView forceInset={{
                top: 'always',
                horizontal: 'never'
            }}>
                <View >
                    <View style={{ flex: 1 }}>
                        {/* <Image source={require('./imagenes/logo.png')} style={stylesCampoBase.drawerImage} /> */}
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={stylesCampoBase.drawerHeaderText}> TrackSport</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </SafeAreaView>
        </DrawerContentScrollView >
    );
}


function InicioActividadNavegador({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="InicioActividad"
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: '#fff' },
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (
                    <Icon
                        name="menu"
                        size={28}
                        color='white'
                        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                    />),
            }} >
            <Stack.Screen
                name="InicioActividad"
                component={InicioActividad}
                options={{ title: 'InicioActividad', }}
            />
        </Stack.Navigator>
    );
}
function QuienesSomosNavegador({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="QuienesSomos"
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (
                    <Icon
                        name="menu"
                        size={28}
                        color='white'
                        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                    />),
            }} >
            <Stack.Screen
                name="QuienesSomos"
                component={QuienesSomos}
                options={{ title: 'Quiénes somos', }}
            />
        </Stack.Navigator>
    );
}

function DrawerNavegador() {
    return (
        <Drawer.Navigator
            initialRouteName="InicioActividad"
            drawerContent={props => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: '#fff',
                },
            }}
        >
            <Drawer.Screen name="InicioActividad" component={InicioActividadNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='Home'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
            <Drawer.Screen name="Quiénes somos" component={QuienesSomosNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='info-circle'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
            {/* <Drawer.Screen name="Calendario" component={CalendarioNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='calendar'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
            <Drawer.Screen name="Contacto" component={ContactoNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='address-card'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            /> */}
        </Drawer.Navigator>
    );
}
class InicioActividad extends Component {
    // componentDidMount() { 
    //     this.props.fetchExcursiones(); 
    //     this.props.fetchComentarios(); 
    //     this.props.fetchCabeceras(); 
    //     this.props.fetchActividades();
    // }
    render() {
        return (
            <NavigationContainer>
                <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
                    <DrawerNavegador />
                </View>
            </NavigationContainer>
        );
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Campobase);
export default InicioActividad;