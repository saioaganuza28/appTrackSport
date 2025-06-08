import * as ActionTypes from './ActionTypes';

import { getDatabase, ref, get, set, push } from 'firebase/database';
import { auth } from '../firebase/firebase';


export const cargarDatosUsuario = () => async dispatch => {
  dispatch({ type: ActionTypes.CARGAR_DATOS_USUARIO });
  try {
    const userId = auth.currentUser?.uid;
    const db = getDatabase();
    const userRef = ref(db, `usuarios/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      dispatch({ type: ActionTypes.CARGAR_DATOS_USUARIO_EXITO, payload: snapshot.val() });
    } else {
      dispatch({ type: ActionTypes.CARGAR_DATOS_USUARIO_EXITO, payload: {} });
    }
  } catch (error) {
    dispatch({ type: ActionTypes.CARGAR_DATOS_USUARIO_ERROR, payload: error.message });
  }
};


export const actualizarDatosUsuario = (nombre, altura, peso, edad, fotoUri) => async dispatch => {

  dispatch({ type: ActionTypes.ACTUALIZAR_DATOS_USUARIO });
  const datos = {
    nombre,
    altura,
    peso,
    edad,
    fotoUri
  };

  try {
    const userId = auth.currentUser?.uid;
    const db = getDatabase();
    await set(ref(db, `usuarios/${userId}`), datos);
    dispatch({ type: ActionTypes.ACTUALIZAR_DATOS_USUARIO_EXITO, payload: datos });
  } catch (error) {
    dispatch({ type: ActionTypes.ACTUALIZAR_DATOS_USUARIO_ERROR, payload: error.message });
  }
};

export const guardarActividad = (actividad) => async dispatch => {
  dispatch({ type: ActionTypes.GUARDAR_ACTIVIDAD });
console.log('llega aqui')

  try {

    const userId = auth.currentUser?.uid;
    const db = getDatabase();
    await push(ref(db, `actividades/${userId}`), actividad);

    dispatch({
      type: ActionTypes.GUARDAR_ACTIVIDAD_EXITO,
      payload: { id: nuevaRef.key, ...actividad },
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.GUARDAR_ACTIVIDAD_ERROR,
      payload: error.message,
    });
  }
};