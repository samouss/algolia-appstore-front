import React from 'react';
import { shallow } from 'enzyme';
import Container from '../index';

describe('<Container />', () => {
  const defaultProps = {};

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <Container
        {...props}
      >
        Content
      </Container>,
    );

    expect(component).toMatchSnapshot();
  });
});
