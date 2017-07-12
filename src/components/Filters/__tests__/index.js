import React from 'react';
import { shallow } from 'enzyme';
import Filters from '../index';

describe('<Filters />', () => {
  const defaultProps = {};

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <Filters
        {...props}
      >
        Content
      </Filters>,
    );

    expect(component).toMatchSnapshot();
  });
});
