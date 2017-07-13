import React from 'react';
import { shallow } from 'enzyme';
import WithQuery, { RatingSort } from '../RatingSort';

jest.mock('components/Algolia', () => ({
  withIndex: jest.fn(Component => props => (
    <Component
      {...props}
      indexName="sample"
      onChange={() => {}}
    />
  )),
}));

describe('<RatingSort />', () => {
  const defaultProps = {
    indexName: 'index',
    onChange: () => {},
  };

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <RatingSort
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
      <RatingSort
        {...props}
      />,
    );

    component
      .find('RadioInput')
      .first()
      .simulate('change', {
        currentTarget: {
          value: 'apps_rating_desc',
        },
      });

    expect(props.onChange).toHaveBeenCalledWith('apps_rating_desc');
  });

  describe('withIndex', () => {
    it('expect to render', () => {
      const component = shallow(
        <WithQuery />,
      );

      expect(component).toMatchSnapshot();
    });
  });
});
