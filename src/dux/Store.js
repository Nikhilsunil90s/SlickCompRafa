/* eslint-disable no-unused-vars */
import rootReducer from './rootReducer';
import INITIAL_STATE from './INITIAL_STATE';
import { persistReducer, purgeStoredState, persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { matchesAPI } from 'api/match';
import { userAPI } from 'api/user';
import { setupListeners } from '@reduxjs/toolkit/query';
import reduxReset from 'redux-reset';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureAppStore = preloadedState =>
  configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(matchesAPI.middleware, userAPI.middleware),
    preloadedState,
    enhancers: [reduxReset()]
  });
const store = configureAppStore(INITIAL_STATE);
export const resetStore = () => {
  store.dispatch({ type: 'RESET', state: INITIAL_STATE });
  purgeStoredState(persistConfig);
  persistStore(store);
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('refreshToken');
};
export default store;
