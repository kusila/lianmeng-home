import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { useStrict } from 'mobx';
import { AppContainer } from 'react-hot-loader';
import * as FastClick from 'fastclick';
import registerServiceWorker from './registerServiceWorker';
useStrict(true);

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root')
  );
};

render();

if (module.hot) {
  module.hot.accept('./App', () => render());
}

FastClick['attach'](document.body);
registerServiceWorker();