import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import App from './App';

const mockStore = configureStore([]);

it('renders without crashing', () => {
  const div = document.createElement('div');
  const history = createBrowserHistory(/* ... */);

  ReactDOM.render(
    <Router history={history} location={{ pathname: '/' }}>
      <Provider store={mockStore({ searches: [] })}>
        <App />
      </Provider>
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
