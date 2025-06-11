import * as ActionTypes from './ActionTypes';

const initialState = {
    actividades: [],
    cargando: false,
    error: null,
};

export const actividades = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.CARGAR_ACTIVIDADES:
        case ActionTypes.GUARDAR_ACTIVIDAD:
            return {
                ...state,
                cargando: true,
                error: null,
            };
        case ActionTypes.CARGAR_ACTIVIDADES_EXITO:
            return {
                ...state,
                cargando: false,
                actividades: Object.values(action.payload), 
            };

        case ActionTypes.GUARDAR_ACTIVIDAD_EXITO:
            return {
                ...state,
                cargando: false,
                actividades: [...state.actividades, action.payload],
            };
        case ActionTypes.CARGAR_ACTIVIDADES_ERROR:
        case ActionTypes.GUARDAR_ACTIVIDAD_ERROR:
            return {
                ...state,
                cargando: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
