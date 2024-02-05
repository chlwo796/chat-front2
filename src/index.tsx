import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import { BrowserRouter } from 'react-router-dom';

// // Froala Editor 스타일 및 스크립트를 동적으로 추가합니다.
// const froalaScript = document.createElement('script');
// froalaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/4.2.6/js/froala_editor.min.js';
// document.head.appendChild(froalaScript);

// const froalaCss = document.createElement('link');
// froalaCss.rel = 'stylesheet';
// froalaCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/4.2.6/css/froala_editor.min.css';
// document.head.appendChild(froalaCss);

// const froalaStyle = document.createElement('link');
// froalaStyle.rel = 'stylesheet';
// froalaStyle.href = 'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/4.2.6/css/froala_style.min.css';
// document.head.appendChild(froalaStyle);

export let persistor = persistStore(store);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </React.StrictMode>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
