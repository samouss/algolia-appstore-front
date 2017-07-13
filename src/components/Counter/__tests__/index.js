import React from 'react';
import { shallow } from 'enzyme';
import Counter from '../index';

describe('<Counter />', () => {
  const defaultProps = {
    value: 1235,
  };

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <Counter
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render with customClassName', () => {
    const props = {
      ...defaultProps,
      customClassName: 'custom-class-name',
    };

    const component = shallow(
      <Counter
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});
