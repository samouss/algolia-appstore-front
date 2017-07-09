import React from 'react';
import { shallow } from 'enzyme';
import Header from '../index';

describe('<Header />', () => {
  it('should render the component', () => {
    const props = {
      title: 'Test app',
    };

    const component = shallow(
      <Header
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});
