import React from 'react';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import connect, { withNumericRefinement } from '../withNumericRefinement';

describe('algolia', () => {
  describe('withNumericRefinement', () => {
    const defaultParameters = {
      attribute: 'rating',
      operator: '>=',
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

      const ApplyComponent = withNumericRefinement(parameters)(Component);

      const component = shallow(
        <ApplyComponent
          {...props}
        />,
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
      const parameters = {
        ...defaultParameters,
      };

      const props = {
        helper: createMockAlgoliaHelper(),
      };

      const ApplyComponent = withNumericRefinement(parameters)(Component);

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
        const parameters = {
          ...defaultParameters,
        };

        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withNumericRefinement(parameters)(Component);

        const component = shallow(
          <ApplyComponent
            {...props}
          />,
        );

        component.instance().onChange(
          3,
          true,
        );

        expect(props.helper.removeNumericRefinement).toHaveBeenCalledWith(
          parameters.attribute,
        );

        expect(props.helper.addNumericRefinement).not.toHaveBeenCalled();

        expect(props.helper.search).toHaveBeenCalled();
      });

      it('expect to call removeDisjunctive, addNumericRefinement and search', () => {
        const parameters = {
          ...defaultParameters,
        };

        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withNumericRefinement(parameters)(Component);

        const component = shallow(
          <ApplyComponent
            {...props}
          />,
        );

        component.instance().onChange(
          3,
          false,
        );

        expect(props.helper.removeNumericRefinement).toHaveBeenCalledWith(
          parameters.attribute,
        );

        expect(props.helper.addNumericRefinement).toHaveBeenCalledWith(
          parameters.attribute,
          parameters.operator,
          3,
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
