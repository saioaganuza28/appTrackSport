import { configureStore } from '@reduxjs/toolkit'


export const ConfigureStore = () => {
    const store = configureStore({
        reducer: {

        },
    });

    return store;
}