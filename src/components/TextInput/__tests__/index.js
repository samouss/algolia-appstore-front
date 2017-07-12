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

  it('expect to call onChange', () => {
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
});
