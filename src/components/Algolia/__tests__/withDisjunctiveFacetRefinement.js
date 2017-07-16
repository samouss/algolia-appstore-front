import React from 'react';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import connect, { withDisjunctiveFacetRefinement } from '../withDisjunctiveFacetRefinement';

describe('algolia', () => {
  describe('withDisjunctiveFacetRefinement', () => {
    const defaultParameters = {
      facet: 'category',
    };

    const Component = props => (
      <input {...props} />
    );

    it('expect to render', () => {
      const parameters = {
        ...defaultParameters,
      };

      const props = {
        className: 'sample-class-name',
        helper: createMockAlgoliaHelper(),
      };

      const ApplyComponent = withDisjunctiveFacetRefinement(parameters)(Component);

      const component = shallow(
        <ApplyComponent
          {...props}
        />,
      );

      expect(component).toMatchSnapshot();
    });

    it('expect to throw when facet is not provided', () => {
      expect(() => withDisjunctiveFacetRefinement()(Component)).toThrow(
        'You must provide the facet parameter.',
      );
    });

    it('expect to call onChange', () => {
      const parameters = {
        ...defaultParameters,
      };

      const props = {
        helper: createMockAlgoliaHelper(),
      };

      const ApplyComponent = withDisjunctiveFacetRefinement(parameters)(Component);

      const onChange = jest.spyOn(ApplyComponent.prototype, 'onChange');

      const component = shallow(
        <ApplyComponent
          {...props}
        />,
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
        const parameters = {
          ...defaultParameters,
        };

        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withDisjunctiveFacetRefinement(parameters)(Component);

        const component = shallow(
          <ApplyComponent
            {...props}
          />,
        );

        component.instance().onChange(
          'Games',
          true,
        );

        expect(props.helper.removeDisjunctiveFacetRefinement).toHaveBeenCalledWith(
          parameters.facet,
        );

        expect(props.helper.addDisjunctiveFacetRefinement).not.toHaveBeenCalled();

        expect(props.helper.search).toHaveBeenCalled();
      });

      it('expect to call removeDisjunctive, addDisjunctiveFacet and search', () => {
        const parameters = {
          ...defaultParameters,
        };

        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withDisjunctiveFacetRefinement(parameters)(Component);

        const component = shallow(
          <ApplyComponent
            {...props}
          />,
        );

        component.instance().onChange(
          'Games',
          false,
        );

        expect(props.helper.removeDisjunctiveFacetRefinement).toHaveBeenCalledWith(
          parameters.facet,
        );

        expect(props.helper.addDisjunctiveFacetRefinement).toHaveBeenCalledWith(
          parameters.facet,
          'Games',
        );

        expect(props.helper.search).toHaveBeenCalled();
      });
    });

    describe('connect', () => {
      it('expect to render', () => {
        const context = {
          algoliaHelper: createMockAlgoliaHelper(),
          algoliaClient: createMockAlgoliaClient(),
        };

        const parameters = {
          ...defaultParameters,
        };

        const props = {
          className: 'sample-class-name',
        };

        const ApplyComponent = connect(parameters)(Component);

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
