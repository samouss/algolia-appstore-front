import React from 'react';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import withIndex from '../withIndex';

describe('algolia', () => {
  describe('withIndex', () => {
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

      const ApplyComponent = withIndex(Component);

      const component = shallow(
        <ApplyComponent
          {...props}
        />,
        { context },
      );

      expect(component).toMatchSnapshot();
    });

    it('expect to call onChange', () => {
      const context = createContext();
      const ApplyComponent = withIndex(Component);

      const onChange = jest.spyOn(ApplyComponent.prototype, 'onChange');

      const component = shallow(
        <ApplyComponent />,
        { context },
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
        const context = createContext();
        const ApplyComponent = withIndex(Component);
        const newIndexName = 'new_index_name';

        const expectation = {
          indexName: 'new_index_name',
        };

        const component = shallow(
          <ApplyComponent />,
          { context },
        );

        component.instance().onChange(newIndexName);

        expect(component.state()).toEqual(expectation);
      });

      it('expect to call setIndex and search', () => {
        const context = createContext();
        const ApplyComponent = withIndex(Component);
        const newIndexName = 'new_index_name';

        const component = shallow(
          <ApplyComponent />,
          { context },
        );

        component.instance().onChange(newIndexName);

        expect(context.algoliaHelper.setIndex).toHaveBeenCalledWith(newIndexName);
        expect(context.algoliaHelper.search).toHaveBeenCalled();
      });
    });
  });
});
