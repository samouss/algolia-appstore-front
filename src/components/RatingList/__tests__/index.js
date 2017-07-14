import React from 'react';
import { shallow } from 'enzyme';
import RatingList from '../index';

describe('<RatingList />', () => {
  const defaultProps = {
    facetValues: [
      {
        name: '4',
        count: 1234,
        isRefined: true,
      },
      {
        name: '2',
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
      <RatingList
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
      <RatingList
        {...props}
      />,
    );

    component
      .find('FilterItem')
      .first()
      .simulate('change');

    expect(props.onChange).toHaveBeenCalledWith(
      '4',
      true,
    );
  });
});
