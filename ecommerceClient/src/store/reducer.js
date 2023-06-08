import { combineReducers } from 'redux';


let defaultState = {
    session:{},
    comments:[],
    users:[],
    groups:[],
    tasks:[]
};

export const reducer = combineReducers({
    session(userSession = defaultState.session,action){
        let {type,authenticated, session} = action;
        switch(type){
            
            default:
                return userSession;
        }
    },

});
