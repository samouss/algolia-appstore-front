import React from 'react';
import { shallow } from 'enzyme';
import Column from '../index';

describe('<Column />', () => {
  const defaultProps = {};

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <Column
        {...props}
      >
        Content
      </Column>,
    );

    expect(component).toMatchSnapshot();
  });
});
