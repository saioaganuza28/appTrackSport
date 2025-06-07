import { configureStore } from '@reduxjs/toolkit';
import { user } from './user';

export const ConfigureStore = () => {
    const store = configureStore({
        reducer: {
            user: user
        },
    });

    return store;
}