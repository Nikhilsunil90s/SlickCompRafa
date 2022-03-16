import 'api/interceptors/request-interceptor';
import 'api/interceptors/response-interceptor';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Main from './Main';
import 'helpers/initFA';
// @ts-ignore
import Store from 'dux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(Store);

ReactDOM.render(
  <React.StrictMode>
    <Main>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Main>
  </React.StrictMode>,
  document.getElementById('main')
);
