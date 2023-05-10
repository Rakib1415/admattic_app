import { configureStore } from '@reduxjs/toolkit';
import adGroupReducer from '../features/ad-group/adGroupSlice';
import { apiSlice } from '../features/api/apiSlice';
import campaignReducer from '../features/campaign/campaignSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        adGroup: adGroupReducer,
        campaign: campaignReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
