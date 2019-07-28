import { applyMiddleware, createStore } from "redux";
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../rootReducer";
import thunk from "redux-thunk";
import firebase from '../../common/config/firebase';

const rrfConfig = {
    userProfile: 'users',
    attachAuthIsReady: true,
    useFirestoreForProfile: true,
    updateProfileOnLogin: false
};

export const configureStore = () => {
    const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})];

    const composedEnhancer = composeWithDevTools(
        applyMiddleware(...middlewares),
        reactReduxFirebase(firebase, rrfConfig),
        reduxFirestore(firebase)
    );

    const store = createStore(rootReducer, composedEnhancer);

    return store;
};