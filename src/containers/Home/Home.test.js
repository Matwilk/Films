import React from 'react';
import ReactDOM from 'react-dom';
import RecentSearchesList from '.';
import { mount } from 'enzyme';
import stringHash from 'string-hash';

import { Home } from './';

describe('<Home />', () => {
  const props = {
    fetchFilms: jest.fn()
  };

  it('should render placeholder when no status', () => {
    const wrapper = mount(<Home {...props} />);
    expect(wrapper.find('TextBlock')).toHaveLength(1);
  });

  it('should render error for FAILED', () => {
    const wrapper = mount(<Home {...props} status="FAILED" />);
    expect(
      wrapper
        .find('ReactPlaceholder')
        .children()
        .text()
    ).toEqual('Failed to load films. Check connection and trying again.');
  });

  it('should render with segments based on computed path', () => {
    const source = { value: 'source' };
    const destination = { value: 'destination' };
    const queries = {
      [stringHash(`${source.value}:${destination.value}`)]: [1, 2, 3, 4]
    };

    const wrapper = mount(
      <Home {...props} status="SUCCESS" queries={queries} />
    );
    wrapper.setState({ source, destination });
    expect(wrapper.find('Segment')).toHaveLength(5);
  });
});
