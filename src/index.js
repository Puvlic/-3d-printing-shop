import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./components/Redux/redux"
import AppContainer from "./AppContainer";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
export let renderEntireTree = () => {

    root.render(
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    );
}

renderEntireTree(store.getState());

store.subscribe(() => {
    renderEntireTree();
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
