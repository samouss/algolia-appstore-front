import React from 'react';
import { shallow } from 'enzyme';
import CheckboxInput from '../index';

describe('<CheckboxInput />', () => {
  const defaultProps = {
    id: 'category-games',
    name: 'category',
    value: 'games',
    checked: false,
    onChange: () => {},
  };

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <CheckboxInput
        {...props}
      >
        label
      </CheckboxInput>,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render when checked', () => {
    const props = {
      ...defaultProps,
      checked: true,
    };

    const component = shallow(
      <CheckboxInput
        {...props}
      >
        label
      </CheckboxInput>,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render with customClassName', () => {
    const props = {
      ...defaultProps,
      customClassName: 'custom-class-name',
    };

    const component = shallow(
      <CheckboxInput
        {...props}
      >
        label
      </CheckboxInput>,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to call onChange on input change', () => {
    const props = {
      ...defaultProps,
      onChange: jest.fn(),
    };

    const component = shallow(
      <CheckboxInput
        {...props}
      >
        label
      </CheckboxInput>,
    );

    component
      .find('input')
      .simulate('change');

    expect(props.onChange).toHaveBeenCalled();
  });
});
