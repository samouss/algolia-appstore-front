import React from 'react';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import CategoryFilter from '../CategoryFilter';

describe('<CategoryFilter />', () => {
  it('expect to render', () => {
    const context = {
      algoliaClient: createMockAlgoliaClient(),
      algoliaHelper: createMockAlgoliaHelper(),
    };

    const component = shallow(
      <CategoryFilter />,
      { context },
    );

    const child = component.shallow({
      context,
    });

    expect(child).toMatchSnapshot();
  });
});
