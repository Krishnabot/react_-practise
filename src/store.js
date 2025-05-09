import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import formReducer from './features/form/formSlice';
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
export default store;
