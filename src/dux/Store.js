import rootReducer from './rootReducer';
import INITIAL_STATE from './INITIAL_STATE';
import { persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureAppStore = preloadedState =>
  configureStore({
    reducer: persistedReducer,
    preloadedState
  });
export default configureAppStore(INITIAL_STATE);
