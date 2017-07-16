import React from 'react';
import { shallow } from 'enzyme';
import ClearList from '../index';

describe('<ClearList />', () => {
  const defaultProps = {
    refinements: [
      { name: 'category' },
      { name: 'rating' },
    ],
    onClear: () => {},
  };

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <ClearList
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render nothing', () => {
    const props = {
      ...defaultProps,
      refinements: [],
    };

    const component = shallow(
      <ClearList
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to call onClear', () => {
    const props = {
      ...defaultProps,
      onClear: jest.fn(),
    };

    const component = shallow(
      <ClearList
        {...props}
      />,
    );

    component
      .find('FilterItem')
      .simulate('change');

    expect(props.onClear).toHaveBeenCalled();
  });
});
