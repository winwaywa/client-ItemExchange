import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
// toask message
import { SnackbarProvider } from 'notistack';
//
import { GoogleOAuthProvider } from '@react-oauth/google';

//redux
import { Provider } from 'react-redux';
import store from './app/store';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <SnackbarProvider
                    iconVariant={{
                        success: ' ✅ ',
                        error: ' ✖️ ',
                        warning: ' ⚠️ ',
                        info: ' ℹ️ ',
                    }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <GoogleOAuthProvider clientId="933225985612-0ha2j5bfadfjthia7g57908j431rcd74.apps.googleusercontent.com">
                        <App />
                    </GoogleOAuthProvider>
                </SnackbarProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
