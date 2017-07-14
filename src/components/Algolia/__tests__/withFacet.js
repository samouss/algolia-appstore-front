import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import withFacet from '../withFacet';

describe('algolia', () => {
  describe('withFacet', () => {
    const createContext = () => ({
      algoliaHelper: createMockAlgoliaHelper(),
      algoliaClient: createMockAlgoliaClient(),
    });

    const defaultParameters = {
      facet: 'category',
    };

    const Component = ({ children, className }) => (
      <div className={className}>{children}</div>
    );

    Component.propTypes = {
      className: PropTypes.string.isRequired,
      children: PropTypes.node.isRequired,
    };

    Component.defaultProps = {
      className: '',
    };

    it('expect to render', () => {
      const context = createContext();

      const parameters = {
        ...defaultParameters,
      };

      const props = {
        className: 'sample-class-name',
      };

      const ApplyComponent = withFacet(parameters)(Component);

      const component = shallow(
        <ApplyComponent
          {...props}
        >
          <div>Content</div>
        </ApplyComponent>,
        { context },
      );

      expect(component).toMatchSnapshot();
    });

    it('expect to throw when facet is not provided', () => {
      expect(() => withFacet()(Component)).toThrow('You must provide the facet parameter.');
    });

    it('expect to have correct displayName', () => {
      const parameters = {
        ...defaultParameters,
      };

      const ApplyComponent = withFacet(parameters)(Component);

      const expectation = 'withFacet(Component)';
      const actual = ApplyComponent.displayName;

      expect(actual).toBe(expectation);
    });

    describe('componentDidMount', () => {
      it('expect to set maxValuesPerFacet with default value', () => {
        const context = createContext();

        const parameters = {
          ...defaultParameters,
        };

        const ApplyComponent = withFacet(parameters)(Component);

        const component = shallow(
          <ApplyComponent>
            <div>Content</div>
          </ApplyComponent>,
          { context },
        );

        component.instance().componentDidMount();

        expect(context.algoliaHelper.setQueryParameter).toHaveBeenCalledWith(
          'maxValuesPerFacet',
          10,
        );
      });

      it('expect to set maxValuesPerFacet with given value', () => {
        const context = createContext();

        const parameters = {
          ...defaultParameters,
          maxValuesPerFacet: 25,
        };

        const ApplyComponent = withFacet(parameters)(Component);

        const component = shallow(
          <ApplyComponent>
            <div>Content</div>
          </ApplyComponent>,
          { context },
        );

        component.instance().componentDidMount();

        expect(context.algoliaHelper.setQueryParameter).toHaveBeenCalledWith(
          'maxValuesPerFacet',
          25,
        );
      });

      it('expect to subscribe to result event', () => {
        const context = createContext();

        const parameters = {
          ...defaultParameters,
        };

        const ApplyComponent = withFacet(parameters)(Component);

        const component = shallow(
          <ApplyComponent>
            <div>Content</div>
          </ApplyComponent>,
          { context },
        );

        component.instance().componentDidMount();

        expect(context.algoliaHelper.on).toHaveBeenCalledWith(
          'result',
          component.instance().updateState,
        );
      });
    });

    describe('componentWillUnmount', () => {
      it('expect to unsubscribe to result event', () => {
        const context = createContext();

        const parameters = {
          ...defaultParameters,
        };

        const ApplyComponent = withFacet(parameters)(Component);

        const component = shallow(
          <ApplyComponent>
            <div>Content</div>
          </ApplyComponent>,
          { context },
        );

        component.instance().componentWillUnmount();

        expect(context.algoliaHelper.removeListener).toHaveBeenCalledWith(
          'result',
          component.instance().updateState,
        );
      });
    });

    describe('updateState', () => {
      it('expect to sort facet values by default', () => {
        const context = createContext();

        const parameters = {
          ...defaultParameters,
        };

        const ApplyComponent = withFacet(parameters)(Component);

        const component = shallow(
          <ApplyComponent>
            <div>Content</div>
          </ApplyComponent>,
          { context },
        );

        const content = {
          getFacetValues: jest.fn(() => []),
        };

        component.instance().updateState(content);

        expect(content.getFacetValues).toHaveBeenCalledWith(
          parameters.facet,
          {},
        );
      });

      it('expect to sort facet values by given options', () => {
        const context = createContext();

        const parameters = {
          ...defaultParameters,
          getFacetValuesOptions: {
            sortBy: ['count:desc'],
          },
        };

        const ApplyComponent = withFacet(parameters)(Component);

        const component = shallow(
          <ApplyComponent>
            <div>Content</div>
          </ApplyComponent>,
          { context },
        );

        const content = {
          getFacetValues: jest.fn(() => []),
        };

        component.instance().updateState(content);

        expect(content.getFacetValues).toHaveBeenCalledWith(
          parameters.facet,
          { sortBy: ['count:desc'] },
        );
      });

      it('expect to reduce facet values from given function', () => {
        const context = createContext();

        context.algoliaHelper.getState.mockImplementationOnce(() => ({
          state: 'the state',
        }));

        const parameters = {
          ...defaultParameters,
          reduceFacetValues: jest.fn(() => [
            { name: 'reduce', count: 2 },
          ]),
        };

        const ApplyComponent = withFacet(parameters)(Component);

        const component = shallow(
          <ApplyComponent>
            <div>Content</div>
          </ApplyComponent>,
          { context },
        );

        const content = {
          getFacetValues: jest.fn(() => [
            { count: 0 },
            { count: 10 },
          ]),
        };

        const expectation = [
          { name: 'reduce', count: 2 },
        ];

        component.instance().updateState(content);

        expect(component.state().facetValues).toEqual(expectation);
        expect(parameters.reduceFacetValues).toHaveBeenCalledWith(
          [
            { count: 0 },
            { count: 10 },
          ],
          {
            state: 'the state',
          },
        );
      });
    });
  });
});
