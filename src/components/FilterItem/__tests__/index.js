import React from 'react';
import { shallow } from 'enzyme';
import FilterItem from '../index';

describe('<FilterItem />', () => {
  const defaultProps = {
    isRefined: false,
    onChange: () => {},
  };

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <FilterItem
        {...props}
      >
        Value
      </FilterItem>,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render when refined', () => {
    const props = {
      ...defaultProps,
      isRefined: true,
    };

    const component = shallow(
      <FilterItem
        {...props}
      >
        Value
      </FilterItem>,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to call onChange', () => {
    const props = {
      ...defaultProps,
      onChange: jest.fn(),
    };

    const event = {
      preventDefault: jest.fn(),
    };

    const component = shallow(
      <FilterItem
        {...props}
      >
        Value
      </FilterItem>,
    );

    component
      .find('a')
      .simulate('click', event);

    expect(props.onChange).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
  });
});
