import { configureStore } from '@reduxjs/toolkit';
import appStateSlice from './features/appStateSlice';
import authModalSlice from './features/authModalSlice';
import cartSlice from './features/cartSlice';
import globalLoadinSlice from './features/globalLoadinSlice';
import userSlice from './features/userSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice,
        appState: appStateSlice,
        authModal: authModalSlice,
        globalLoading: globalLoadinSlice,
    },
});

export default store;
