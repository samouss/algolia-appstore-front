import React from 'react';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import connect from '../connect';

describe('algolia', () => {
  describe('connect', () => {
    const createContext = () => ({
      algoliaHelper: createMockAlgoliaHelper(),
      algoliaClient: createMockAlgoliaClient(),
    });

    const Component = props => (
      <input {...props} />
    );

    it('expect to render', () => {
      const context = createContext();

      const props = {
        className: 'sample-class-name',
      };

      const ApplyComponent = connect(Component);

      const component = shallow(
        <ApplyComponent
          {...props}
        />,
        { context },
      );

      expect(component).toMatchSnapshot();
    });

    it('expect to have correct displayName', () => {
      const ApplyComponent = connect(Component);

      const expectation = 'connect(Component)';
      const actual = ApplyComponent.displayName;

      expect(actual).toBe(expectation);
    });
  });
});
