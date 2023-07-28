import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux';

import sessionReducer from "./session";
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
  session: sessionReducer,
});

const configureStore = preloadedState => {

    let enhancer;

    if (process.env.NODE_ENV === 'production') {
        enhancer = applyMiddleware(thunk);
    } else {
        const logger = require('redux-logger').default;
        const composeEnhancers =
            window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
        enhancer = composeEnhancers(applyMiddleware(thunk, logger));
    };

    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
