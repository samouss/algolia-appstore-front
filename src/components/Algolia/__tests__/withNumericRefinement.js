import React from 'react';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import withNumericRefinement from '../withNumericRefinement';

describe('algolia', () => {
  describe('withNumericRefinement', () => {
    const createContext = () => ({
      algoliaHelper: createMockAlgoliaHelper(),
      algoliaClient: createMockAlgoliaClient(),
    });

    const defaultParameters = {
      attribute: 'rating',
      operator: '>=',
    };

    const Component = props => (
      <input {...props} />
    );

    it('expect to render', () => {
      const context = createContext();

      const parameters = {
        ...defaultParameters,
      };

      const props = {
        className: 'sample-class-name',
      };

      const ApplyComponent = withNumericRefinement(parameters)(Component);

      const component = shallow(
        <ApplyComponent
          {...props}
        />,
        { context },
      );

      expect(component).toMatchSnapshot();
    });

    it('expect to throw when attribute is not provided', () => {
      expect(() => withNumericRefinement()(Component)).toThrow(
        'You must provide the attribute parameter.',
      );
    });

    it('expect to throw when operator is not provided', () => {
      expect(() => withNumericRefinement({ attribute: 'rating' })(Component)).toThrow(
        'You must provide the operator parameter.',
      );
    });

    it('expect to call onChange', () => {
      const context = createContext();

      const parameters = {
        ...defaultParameters,
      };

      const ApplyComponent = withNumericRefinement(parameters)(Component);

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
      const parameters = {
        ...defaultParameters,
      };

      const ApplyComponent = withNumericRefinement(parameters)(Component);

      const expectation = 'withNumericRefinement(Component)';
      const actual = ApplyComponent.displayName;

      expect(actual).toBe(expectation);
    });

    describe('onChange', () => {
      it('expect to call removeNumericRefinement and search when isRefined', () => {
        const context = createContext();

        const parameters = {
          ...defaultParameters,
        };

        const ApplyComponent = withNumericRefinement(parameters)(Component);

        const component = shallow(
          <ApplyComponent />,
          { context },
        );

        component.instance().onChange(
          3,
          true,
        );

        expect(context.algoliaHelper.removeNumericRefinement).toHaveBeenCalledWith(
          parameters.attribute,
        );

        expect(context.algoliaHelper.addNumericRefinement).not.toHaveBeenCalled();

        expect(context.algoliaHelper.search).toHaveBeenCalled();
      });

      it('expect to call removeDisjunctive, addNumericRefinement and search', () => {
        const context = createContext();

        const parameters = {
          ...defaultParameters,
        };

        const ApplyComponent = withNumericRefinement(parameters)(Component);

        const component = shallow(
          <ApplyComponent />,
          { context },
        );

        component.instance().onChange(
          3,
          false,
        );

        expect(context.algoliaHelper.removeNumericRefinement).toHaveBeenCalledWith(
          parameters.attribute,
        );

        expect(context.algoliaHelper.addNumericRefinement).toHaveBeenCalledWith(
          parameters.attribute,
          parameters.operator,
          3,
        );

        expect(context.algoliaHelper.search).toHaveBeenCalled();
      });
    });
  });
});
