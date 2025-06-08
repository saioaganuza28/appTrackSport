import { configureStore } from '@reduxjs/toolkit';
import { user } from './user';
import { actividades } from './actividades';

export const ConfigureStore = () => {
    const store = configureStore({
        reducer: {
            user: user,
            actividades: actividades,
        },
    });

    return store;
}