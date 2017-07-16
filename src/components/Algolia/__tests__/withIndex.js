import React from 'react';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import connect, { withIndex } from '../withIndex';

describe('algolia', () => {
  describe('withIndex', () => {
    const Component = props => (
      <input {...props} />
    );

    it('expect to render', () => {
      const props = {
        className: 'sample-class-name',
        helper: createMockAlgoliaHelper(),
      };

      const ApplyComponent = withIndex(Component);

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

      const ApplyComponent = withIndex(Component);

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
      const ApplyComponent = withIndex(Component);

      const expectation = 'withIndex(Component)';
      const actual = ApplyComponent.displayName;

      expect(actual).toBe(expectation);
    });

    describe('onChange', () => {
      it('expect to call setState', () => {
        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withIndex(Component);
        const newIndexName = 'new_index_name';

        const expectation = {
          indexName: 'new_index_name',
        };

        const component = shallow(
          <ApplyComponent
            {...props}
          />,
        );

        component.instance().onChange(newIndexName);

        expect(component.state()).toEqual(expectation);
      });

      it('expect to call setIndex and search', () => {
        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withIndex(Component);
        const newIndexName = 'new_index_name';

        const component = shallow(
          <ApplyComponent
            {...props}
          />,
        );

        component.instance().onChange(newIndexName);

        expect(props.helper.setIndex).toHaveBeenCalledWith(newIndexName);
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
