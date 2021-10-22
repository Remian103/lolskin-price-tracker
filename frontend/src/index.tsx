import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './css/index.css';

// Theme
import { Provider as StyletronProvider, DebugEngine } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { ThemeProvider, StyleReset } from 'atomize';

// router
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';

// context
import UserProvider from './context/UserProvider';

const theme = {
    colors: {
        primary: 'tomato',
        accent: 'yellow',
    },
};

const debug: DebugEngine | undefined = process.env.NODE_ENV === 'production' ? undefined : new DebugEngine();

// 1. Create a client engine instance
const engine: Styletron = new Styletron();

// 2. Provide the engine to the app
// debug engine needs inlined source maps
ReactDOM.render(
    <React.StrictMode>
        <StyletronProvider value={engine} debug={debug} debugAfterHydration>
            <ThemeProvider theme={theme}>
                <StyleReset />
                <Router>
                    <UserProvider>
                        <App />
                    </UserProvider>
                </Router>
            </ThemeProvider>
        </StyletronProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
