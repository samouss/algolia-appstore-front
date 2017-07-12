import React from 'react';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import Search from '../Search';

describe('<Search />', () => {
  it('expect to render', () => {
    const context = {
      algoliaClient: createMockAlgoliaClient(),
      algoliaHelper: createMockAlgoliaHelper(),
    };

    const component = shallow(
      <Search />,
      { context },
    );

    expect(component).toMatchSnapshot();
  });
});
