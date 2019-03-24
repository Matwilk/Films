import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import App from './';

const props = {
  dispatch: jest.fn()
};

const mockStore = configureStore([thunk]);

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Provider store={mockStore({ films: {}, status: '', queries: {} })}>
      <App {...props} />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
