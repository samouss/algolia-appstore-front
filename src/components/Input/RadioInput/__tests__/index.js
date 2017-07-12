import React from 'react';
import { shallow } from 'enzyme';
import RadioInput from '../index';

describe('<RadioInput />', () => {
  const defaultProps = {
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
      <RadioInput
        {...props}
      >
        label
      </RadioInput>,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render when checked', () => {
    const props = {
      ...defaultProps,
      checked: true,
    };

    const component = shallow(
      <RadioInput
        {...props}
      >
        label
      </RadioInput>,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render with customClassName', () => {
    const props = {
      ...defaultProps,
      customClassName: 'custom-class-name',
    };

    const component = shallow(
      <RadioInput
        {...props}
      >
        label
      </RadioInput>,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render with customActiveClassName', () => {
    const props = {
      ...defaultProps,
      checked: true,
      customActiveClassName: 'custom-active-class-name',
    };

    const component = shallow(
      <RadioInput
        {...props}
      >
        label
      </RadioInput>,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to call onChange on input change', () => {
    const props = {
      ...defaultProps,
      onChange: jest.fn(),
    };

    const component = shallow(
      <RadioInput
        {...props}
      >
        label
      </RadioInput>,
    );

    component
      .find('input')
      .simulate('change');

    expect(props.onChange).toHaveBeenCalled();
  });
});
