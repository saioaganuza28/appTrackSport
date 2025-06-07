import * as ActionTypes from '../actionTypes';

const initialState = {
  datos: {
    nombre: '',
    altura: '',
    peso: '',
    edad: '',
    fotoUri: null,
  },
  isLoading: false,
  errMess: null,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CARGAR_DATOS_USUARIO:
    case ActionTypes.ACTUALIZAR_DATOS_USUARIO:
      return { ...state, isLoading: true, errMess: null };

    case ActionTypes.CARGAR_DATOS_USUARIO_EXITO:
    case ActionTypes.ACTUALIZAR_DATOS_USUARIO_EXITO:
      return { ...state, isLoading: false, datos: action.payload, errMess: null };

    case ActionTypes.CARGAR_DATOS_USUARIO_ERROR:
    case ActionTypes.ACTUALIZAR_DATOS_USUARIO_ERROR:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
