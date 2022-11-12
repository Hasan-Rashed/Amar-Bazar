import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

/* A component that allows you to pass the store to all of your components. */
import { Provider } from 'react-redux';

import store from './store';

/* Setting the options for the alert. */
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
/* A component that allows you to pass the store to all of your components. */
  <Provider store={store} >     {/* using Provider instead of React.Strict Mode */}
    {/* Passing the alert template and options to the App component. */}
    <AlertProvider template={AlertTemplate} {...options} >
      <App />
    </AlertProvider>
  </Provider>
);