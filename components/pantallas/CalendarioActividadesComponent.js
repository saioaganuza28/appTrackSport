import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { cargarActividades } from '../../redux/ActionCreators';

const mapStateToProps = state => ({
    actividades: state.actividades.actividades,
});


const mapDispatchToProps = dispatch => ({
    cargarActividades: () => dispatch(cargarActividades())
})


class CalendarioActividades extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fechaSeleccionada: '',
            actividadesDelDia: [],
        };
    }

    componentDidMount() {
        this.props.cargarActividades();

        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.props.cargarActividades();
        });
    }

    componentWillUnmount() {
        this.focusListener && this.focusListener();
    }


    componentDidUpdate(prevProps) {
        if (prevProps.actividades !== this.props.actividades) {
            const { fechaSeleccionada } = this.state;

            if (fechaSeleccionada) {
                const actividadesFiltradas = this.props.actividades.filter(act =>
                    act.timestamp?.startsWith(fechaSeleccionada)
                );
                this.setState({ actividadesDelDia: actividadesFiltradas });
            }
        }
    }


    marcarFechas = () => {
        const actividades = this.props.actividades;
        const { fechaSeleccionada } = this.state;

        if (!actividades || actividades.length === 0) {
            return {};
        }

        const fechasConActividad = {};

        actividades.forEach(act => {
            const fecha = act.timestamp?.split('T')[0];
            if (fecha) {
                fechasConActividad[fecha] = {
                    marked: true,
                    dotColor: '#00ffec',
                    ...(fecha === fechaSeleccionada && {
                        selected: true,
                        selectedColor: '#ae5be1',
                    }),
                };
            }
        });

        return fechasConActividad;
    };



    seleccionarFecha = (day) => {
        const fecha = day.dateString;
        const actividadesFiltradas = this.props.actividades.filter(act =>
            act.timestamp?.startsWith(fecha)
        );
        this.setState({
            fechaSeleccionada: fecha,
            actividadesDelDia: actividadesFiltradas,
        });
    };

    irAResumen = (actividad) => {
        this.props.navigation.navigate('ResumenActividad', { actividad });
    };

    render() {
        const { fechaSeleccionada, actividadesDelDia } = this.state;

        return (
            <View style={{ flex: 1, padding: 10 }}>
                <Calendar
                    onDayPress={this.seleccionarFecha}
                    markedDates={this.marcarFechas()}
                    theme={{
                        selectedDayBackgroundColor: '#ae5be1',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#ae5be1',
                        arrowColor: '#ae5be1',
                        dotColor: 'yellow',
                        textDayFontWeight: '500',
                        textMonthFontWeight: 'bold',
                        monthTextColor: '#ae5be1',
                    }}
                />

                {fechaSeleccionada ? (
                    <>
                        <Text style={{ marginVertical: 10, fontWeight: 'bold' }}>
                            Actividades del {fechaSeleccionada}
                        </Text>
                        {actividadesDelDia.length > 0 ? (
                            <FlatList
                                data={actividadesDelDia}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={{
                                            padding: 10,
                                            backgroundColor: '#f1f1f1',
                                            marginBottom: 10,
                                            borderRadius: 5,
                                            borderColor: '#ae5be1',
                                            borderWidth: 2,
                                            backgroundColor: '#d7a1f7'
                                        }}
                                        onPress={() => this.irAResumen(item)}
                                    >
                                        <Text>⏱ Tiempo: {item.tiempo}s</Text>
                                        <Text>📏 Distancia: {(item.distancia / 1000).toFixed(2)} km</Text>
                                        <Text>⚡ Promedio: {item.promedio} m/s</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        ) : (
                            <Text style={{ fontStyle: 'italic' }}>
                                No hay actividades ese día.
                            </Text>
                        )}
                    </>
                ) : (
                    <Text style={{ marginTop: 20 }}>
                        Selecciona una fecha para ver tus actividades.
                    </Text>
                )}
            </View>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CalendarioActividades);
