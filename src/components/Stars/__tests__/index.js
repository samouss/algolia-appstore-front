import React from 'react';
import { shallow } from 'enzyme';
import Stars from '../index';

describe('<Stars />', () => {
  const defaultProps = {
    value: 0,
    on: 5,
  };

  it('expect to render value 0', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <Stars
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render value 3', () => {
    const props = {
      ...defaultProps,
      value: 3,
    };

    const component = shallow(
      <Stars
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render value 3.5', () => {
    const props = {
      ...defaultProps,
      value: 3.5,
    };

    const component = shallow(
      <Stars
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render value 5', () => {
    const props = {
      ...defaultProps,
      value: 5,
    };

    const component = shallow(
      <Stars
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render value 5 on 10', () => {
    const props = {
      ...defaultProps,
      value: 5,
      on: 10,
    };

    const component = shallow(
      <Stars
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render with custom color', () => {
    const props = {
      ...defaultProps,
      color: 'red',
    };

    const component = shallow(
      <Stars
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});
