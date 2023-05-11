import { configureStore,  applyMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import {createLogger} from 'redux-logger'

import { reducer } from './reducer'
import * as sagas from './sagas'

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore(
    reducer,
    applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
}