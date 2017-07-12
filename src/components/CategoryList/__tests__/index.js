import React from 'react';
import { shallow } from 'enzyme';
import CategoryList from '../index';

describe('<CategoryList />', () => {
  const defaultProps = {
    facetValues: [
      {
        name: 'Games',
        count: 1234,
        isRefined: true,
      },
      {
        name: 'Social',
        count: 5678,
        isRefined: false,
      },
    ],
    onChange: () => {},
  };

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <CategoryList
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
      <CategoryList
        {...props}
      />,
    );

    component
      .find('CategoryItem')
      .first()
      .simulate('change');

    expect(props.onChange).toHaveBeenCalled();
  });
});
