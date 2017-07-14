import React from 'react';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import withDisjunctiveFacetRefinement from '../withDisjunctiveFacetRefinement';

describe('algolia', () => {
  describe('withDisjunctiveFacetRefinement', () => {
    const createContext = () => ({
      algoliaHelper: createMockAlgoliaHelper(),
      algoliaClient: createMockAlgoliaClient(),
    });

    const defaultParameters = {
      facet: 'category',
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

      const ApplyComponent = withDisjunctiveFacetRefinement(parameters)(Component);

      const component = shallow(
        <ApplyComponent
          {...props}
        />,
        { context },
      );

      expect(component).toMatchSnapshot();
    });

    it('expect to throw when facet is not provided', () => {
      expect(() => withDisjunctiveFacetRefinement()(Component)).toThrow(
        'You must provide the facet parameter.',
      );
    });

    it('expect to call onChange', () => {
      const context = createContext();

      const parameters = {
        ...defaultParameters,
      };

      const ApplyComponent = withDisjunctiveFacetRefinement(parameters)(Component);

      const onChange = jest.spyOn(ApplyComponent.prototype, 'onChange');

      const component = shallow(
        <ApplyComponent />,
        { context },
      );

      component
        .find('Component')
        .simulate('change', {
          currentTarget: {
            value: '',
          },
        });

      expect(onChange).toHaveBeenCalled();
      onChange.mockRestore();
    });

    it('expect to have correct displayName', () => {
      const parameters = {
        ...defaultParameters,
      };

      const ApplyComponent = withDisjunctiveFacetRefinement(parameters)(Component);

      const expectation = 'withDisjunctiveFacetRefinement(Component)';
      const actual = ApplyComponent.displayName;

      expect(actual).toBe(expectation);
    });

    describe('onChange', () => {
      it('expect to call removeDisjunctiveFacetRefinement and search when isRefined', () => {
        const context = createContext();

        const parameters = {
          ...defaultParameters,
        };

        const ApplyComponent = withDisjunctiveFacetRefinement(parameters)(Component);

        const component = shallow(
          <ApplyComponent />,
          { context },
        );

        component.instance().onChange(
          'Games',
          true,
        );

        expect(context.algoliaHelper.removeDisjunctiveFacetRefinement).toHaveBeenCalledWith(
          parameters.facet,
        );

        expect(context.algoliaHelper.addDisjunctiveFacetRefinement).not.toHaveBeenCalled();

        expect(context.algoliaHelper.search).toHaveBeenCalled();
      });

      it('expect to call removeDisjunctive, addDisjunctiveFacet and search', () => {
        const context = createContext();

        const parameters = {
          ...defaultParameters,
        };

        const ApplyComponent = withDisjunctiveFacetRefinement(parameters)(Component);

        const component = shallow(
          <ApplyComponent />,
          { context },
        );

        component.instance().onChange(
          'Games',
          false,
        );

        expect(context.algoliaHelper.removeDisjunctiveFacetRefinement).toHaveBeenCalledWith(
          parameters.facet,
        );

        expect(context.algoliaHelper.addDisjunctiveFacetRefinement).toHaveBeenCalledWith(
          parameters.facet,
          'Games',
        );

        expect(context.algoliaHelper.search).toHaveBeenCalled();
      });
    });
  });
});
