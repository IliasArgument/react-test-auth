import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlices';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer
    },
});