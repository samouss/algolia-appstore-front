import React from 'react';
import { shallow } from 'enzyme';
import Content from '../index';

describe('<Content />', () => {
  it('should render the component', () => {
    const props = {
      message: 'Test app',
    };

    const component = shallow(
      <Content
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});
