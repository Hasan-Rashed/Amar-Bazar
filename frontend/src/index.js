import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/* A component that allows you to pass the store to all of your components. */
import { Provider } from 'react-redux';

import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
/* A component that allows you to pass the store to all of your components. */
  <Provider store={store} >    // using Provider instead of React.Strict Mode
    <App />
  </Provider>
);