import React from 'react';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import WithQuery, { SearchFilter } from '../SearchFilter';

describe('<SearchFilter />', () => {
  const defaultProps = {
    query: 'This is a query',
    onChange: () => {},
  };

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <SearchFilter
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
      <SearchFilter
        {...props}
      />,
    );

    component
      .find('TextInput')
      .simulate('change', {
        currentTarget: {
          value: 'query',
        },
      });

    expect(props.onChange).toHaveBeenCalledWith('query');
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
