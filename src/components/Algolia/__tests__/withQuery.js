import React from 'react';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import connect, { withQuery } from '../withQuery';

describe('algolia', () => {
  describe('withQuery', () => {
    const Component = props => (
      <input {...props} />
    );

    it('expect to render', () => {
      const props = {
        className: 'sample-class-name',
        helper: createMockAlgoliaHelper(),
      };

      const ApplyComponent = withQuery(Component);

      const component = shallow(
        <ApplyComponent
          {...props}
        />,
      );

      expect(component).toMatchSnapshot();
    });

    it('expect to call onChange', () => {
      const props = {
        helper: createMockAlgoliaHelper(),
      };

      const ApplyComponent = withQuery(Component);
      const onChange = jest.spyOn(ApplyComponent.prototype, 'onChange');

      const component = shallow(
        <ApplyComponent
          {...props}
        />,
      );

      component
        .find('Component')
        .simulate('change');

      expect(onChange).toHaveBeenCalled();
      onChange.mockRestore();
    });

    it('expect to have correct displayName', () => {
      const ApplyComponent = withQuery(Component);

      const expectation = 'withQuery(Component)';
      const actual = ApplyComponent.displayName;

      expect(actual).toBe(expectation);
    });

    describe('onChange', () => {
      it('expect to call setState', () => {
        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withQuery(Component);

        const expectation = {
          query: 'This is a query',
        };

        const component = shallow(
          <ApplyComponent
            {...props}
          />,
        );

        component.instance().onChange('This is a query');

        expect(component.state()).toEqual(expectation);
      });

      it('expect to call setQuery and search', () => {
        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withQuery(Component);

        const expectation = 'This is a query';

        const component = shallow(
          <ApplyComponent
            {...props}
          />,
        );

        component.instance().onChange('This is a query');

        expect(props.helper.setQuery).toHaveBeenCalledWith(expectation);
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
