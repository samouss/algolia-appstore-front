import React from 'react';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import WithQuery, { Search } from '../Search';

describe('<Search />', () => {
  const defaultProps = {
    query: 'This is a query',
    onChange: () => {},
  };

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <Search
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
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
