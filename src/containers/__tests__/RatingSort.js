import React from 'react';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import WithQuery, { RatingSort } from '../RatingSort';

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

  describe('withQuery', () => {
    it('expect to render', () => {
      const context = {
        algoliaClient: createMockAlgoliaClient(),
        algoliaHelper: createMockAlgoliaHelper(),
      };

      const component = shallow(
        <WithQuery />,
        { context },
      );

      expect(component).toMatchSnapshot();
    });
  });
});
