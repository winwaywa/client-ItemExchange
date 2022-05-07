import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
// toask message
import { SnackbarProvider } from 'notistack';

//redux
import { Provider } from 'react-redux';
import store from './app/store';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <App />
                </SnackbarProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
