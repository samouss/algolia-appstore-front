import React from 'react';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import InfiniteAppList from '../InfiniteAppList';

describe('<InfiniteAppList />', () => {
  it('expect to render', () => {
    const context = {
      algoliaClient: createMockAlgoliaClient(),
      algoliaHelper: createMockAlgoliaHelper(),
    };

    const component = shallow(
      <InfiniteAppList />,
      { context },
    );

    expect(component).toMatchSnapshot();
  });
});
