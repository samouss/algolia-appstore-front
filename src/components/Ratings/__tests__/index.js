import React from 'react';
import { shallow } from 'enzyme';
import Ratings from '../index';

describe('<Ratings />', () => {
  const defaultProps = {
    note: 0,
    on: 5,
  };

  it('expect to render note 0', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <Ratings
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render note 3', () => {
    const props = {
      ...defaultProps,
      note: 3,
    };

    const component = shallow(
      <Ratings
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render note 3.5', () => {
    const props = {
      ...defaultProps,
      note: 3.5,
    };

    const component = shallow(
      <Ratings
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render note 5', () => {
    const props = {
      ...defaultProps,
      note: 5,
    };

    const component = shallow(
      <Ratings
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render note 5 on 10', () => {
    const props = {
      ...defaultProps,
      note: 5,
      on: 10,
    };

    const component = shallow(
      <Ratings
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});
