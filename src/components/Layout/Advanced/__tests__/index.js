import React from 'react';
import { shallow } from 'enzyme';
import Advanced from '../index';

describe('<Advanced />', () => {
  const defaultProps = {};

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <Advanced
        {...props}
      >
        Content
      </Advanced>,
    );

    expect(component).toMatchSnapshot();
  });
});
