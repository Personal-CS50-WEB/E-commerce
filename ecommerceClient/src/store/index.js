import { configureStore,  applyMiddleware ,  } from '@reduxjs/toolkit';
import { defaultState } from '../server/defaultState';
import {reducer} from './reducer';

const store = configureStore({
    reducer:  function (state=defaultState, action) {
        return state
        
    },
});

export default store;