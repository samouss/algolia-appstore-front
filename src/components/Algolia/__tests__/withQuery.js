import React from 'react';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import withQuery from '../withQuery';

describe('algolia', () => {
  describe('withQuery', () => {
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

      const ApplyComponent = withQuery(Component);

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
      const ApplyComponent = withQuery(Component);
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
      const ApplyComponent = withQuery(Component);

      const expectation = 'withQuery(Component)';
      const actual = ApplyComponent.displayName;

      expect(actual).toBe(expectation);
    });

    describe('onChange', () => {
      it('expect to call setState', () => {
        const context = createContext();
        const ApplyComponent = withQuery(Component);

        const expectation = {
          query: 'This is a query',
        };

        const component = shallow(
          <ApplyComponent />,
          { context },
        );

        component.instance().onChange('This is a query');

        expect(component.state()).toEqual(expectation);
      });

      it('expect to call setQuery and search', () => {
        const context = createContext();
        const ApplyComponent = withQuery(Component);

        const expectation = 'This is a query';

        const component = shallow(
          <ApplyComponent />,
          { context },
        );

        component.instance().onChange('This is a query');

        expect(context.algoliaHelper.setQuery).toHaveBeenCalledWith(expectation);
        expect(context.algoliaHelper.search).toHaveBeenCalled();
      });
    });
  });
});
