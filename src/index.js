import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/common/layout';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import ScrollToTop from "./app/common/utils/ScrollToTop";
import { configureStore } from "./app/redux/store/configureStore";
import { Provider } from "react-redux";
import Loading from "./app/common/components/Loading";

const store = configureStore();

let loadingRender = () => {
    ReactDOM.render(<Loading />, document.getElementById('root'));
};

let appRender = () => {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <ScrollToTop>
                    <App />
                </ScrollToTop>
            </BrowserRouter>
        </Provider>
        ,document.getElementById('root')
    );
};

loadingRender();

store.firebaseAuthIsReady.then(() => {
    setTimeout(() => appRender(), 0); //loading that the application is actually ready
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
