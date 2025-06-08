import * as ActionTypes from './ActionTypes';

const initialState = {
  actividades: {},
  cargando: false,
  error: null,
};

export const actividades = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GUARDAR_ACTIVIDAD:
      return {
        ...state,
        cargando: true,
        error: null,
      };

    case ActionTypes.GUARDAR_ACTIVIDAD_EXITO:
      const nuevaActividad = action.payload;
      return {
        ...state,
        cargando: false,
        actividades: {
          ...state.actividades,
          [nuevaActividad.id]: nuevaActividad, 
        },
      };

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