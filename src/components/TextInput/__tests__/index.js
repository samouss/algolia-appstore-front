import React from 'react';
import { shallow } from 'enzyme';
import TextInput from '../index';

describe('<TextInput />', () => {
  const defaultProps = {
    value: 'http://link.com',
    onChange: () => {},
  };

  it('expect to render', () => {
    const props = {
      ...defaultProps,
      placeholder: 'Hello',
    };

    const component = shallow(
      <TextInput
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render without clear button when value is empty', () => {
    const props = {
      ...defaultProps,
      value: '',
    };

    const component = shallow(
      <TextInput
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render without clear button when disabled', () => {
    const props = {
      ...defaultProps,
      enableClearButton: false,
    };

    const component = shallow(
      <TextInput
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to call onChange on input change', () => {
    const props = {
      ...defaultProps,
      onChange: jest.fn(),
    };

    const component = shallow(
      <TextInput
        {...props}
      />,
    );

    component
      .find('input')
      .simulate('change');

    expect(props.onChange).toHaveBeenCalled();
  });

  it('expect to call onChange on input clear', () => {
    const props = {
      ...defaultProps,
      onChange: jest.fn(),
    };

    const component = shallow(
      <TextInput
        {...props}
      />,
    );

    component
      .find('i')
      .simulate('click');

    expect(props.onChange).toHaveBeenCalledWith({
      currentTarget: {
        value: '',
      },
    });
  });
});
