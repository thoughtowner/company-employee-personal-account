import React from 'react';
import ReactDOM from 'react-dom/client';
import styles from './index.module.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

function clearTokenOnStart() {
    localStorage.removeItem('token'); // Удаляет токен при запуске приложения
}

clearTokenOnStart(); // Вызов функции для удаления токена

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Theme preset={presetGpnDefault}>
            <App />
        </Theme>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
