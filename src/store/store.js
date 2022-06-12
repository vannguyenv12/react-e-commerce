import logger from 'redux-logger';
import { compose, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './root-reducer';

// const composeEnhancers = compose(applyMiddleware(...middlewares));

const persitConfig = {
  key: root,
  storage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persitConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [process.env.NODE_ENV === 'development' && logger].filter(
    Boolean
  ),
});

export const persistor = persistStore(store);
