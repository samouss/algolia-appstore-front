import React from 'react';
import { shallow } from 'enzyme';
import Row from '../index';

describe('<Row />', () => {
  const defaultProps = {};

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <Row
        {...props}
      >
        Content
      </Row>,
    );

    expect(component).toMatchSnapshot();
  });
});
