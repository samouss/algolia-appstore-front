import React from 'react';
import { shallow } from 'enzyme';
import CategoryItem from '../index';

describe('<CategoryItem />', () => {
  const defaultProps = {
    name: 'Games',
    count: 1235,
    isRefined: false,
    onChange: () => {},
  };

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <CategoryItem
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render when refined', () => {
    const props = {
      ...defaultProps,
      isRefined: true,
    };

    const component = shallow(
      <CategoryItem
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to call onChange', () => {
    const props = {
      ...defaultProps,
      onChange: jest.fn(),
    };

    const component = shallow(
      <CategoryItem
        {...props}
      />,
    );

    component
      .find('CheckboxInput')
      .simulate('change');

    expect(props.onChange).toHaveBeenCalled();
  });
});
