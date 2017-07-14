import React from 'react';
import { shallow } from 'enzyme';
import FilterList from '../index';

describe('<FilterList />', () => {
  const defaultProps = {};

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <FilterList
        {...props}
      >
        <li>Content</li>
        <li>Content</li>
      </FilterList>,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render with customClassName', () => {
    const props = {
      ...defaultProps,
      customClassName: 'custom-class-name',
    };

    const component = shallow(
      <FilterList
        {...props}
      >
        <li>Content</li>
        <li>Content</li>
      </FilterList>,
    );

    expect(component).toMatchSnapshot();
  });
});
