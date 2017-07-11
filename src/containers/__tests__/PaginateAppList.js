import React from 'react';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import PaginateAppList from '../PaginateAppList';

describe('<PaginateAppList />', () => {
  it('expect to render', () => {
    const context = {
      algoliaClient: createMockAlgoliaClient(),
      algoliaHelper: createMockAlgoliaHelper(),
    };

    const component = shallow(
      <PaginateAppList />,
      { context },
    );

    expect(component).toMatchSnapshot();
  });
});
