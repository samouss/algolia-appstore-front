import React from 'react';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import connect, { withClearRefinements } from '../withClearRefinements';

describe('algolia', () => {
  describe('withClearRefinements', () => {
    const Component = props => (
      <input {...props} />
    );

    it('expect to render', () => {
      const props = {
        className: 'sample-class-name',
        helper: createMockAlgoliaHelper(),
      };

      const ApplyComponent = withClearRefinements(Component);

      const component = shallow(
        <ApplyComponent
          {...props}
        />,
      );

      expect(component).toMatchSnapshot();
    });

    it('expect to call onClear', () => {
      const props = {
        helper: createMockAlgoliaHelper(),
      };

      const ApplyComponent = withClearRefinements(Component);

      const onClear = jest.spyOn(ApplyComponent.prototype, 'onClear');

      const component = shallow(
        <ApplyComponent
          {...props}
        />,
      );

      component
        .find('Component')
        .simulate('clear');

      expect(onClear).toHaveBeenCalled();
      onClear.mockRestore();
    });

    it('expect to have correct displayName', () => {
      const ApplyComponent = withClearRefinements(Component);

      const expectation = 'withClearRefinements(Component)';
      const actual = ApplyComponent.displayName;

      expect(actual).toBe(expectation);
    });

    describe('onClear', () => {
      it('expect to call clearRefinements and search', () => {
        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withClearRefinements(Component);

        const component = shallow(
          <ApplyComponent
            {...props}
          />,
        );

        component.instance().onClear();

        expect(props.helper.clearRefinements).toHaveBeenCalled();
        expect(props.helper.search).toHaveBeenCalled();
      });
    });

    describe('connect', () => {
      it('expect to render', () => {
        const context = {
          algoliaHelper: createMockAlgoliaHelper(),
          algoliaClient: createMockAlgoliaClient(),
        };

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
    });
  });
});
