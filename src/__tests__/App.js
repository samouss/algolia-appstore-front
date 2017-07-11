import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('<App>', () => {
  it('expect to render', () => {
    const component = shallow(
      <App />,
    );

    expect(component).toMatchSnapshot();
  });
});
