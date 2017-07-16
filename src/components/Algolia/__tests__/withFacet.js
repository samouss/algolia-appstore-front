import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import connect, { withFacet } from '../withFacet';

describe('algolia', () => {
  describe('withFacet', () => {
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
      const parameters = {
        ...defaultParameters,
      };

      const props = {
        className: 'sample-class-name',
        helper: createMockAlgoliaHelper(),
      };

      const ApplyComponent = withFacet(parameters)(Component);

      const component = shallow(
        <ApplyComponent
          {...props}
        >
          <div>Content</div>
        </ApplyComponent>,
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
        const parameters = {
          ...defaultParameters,
        };

        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withFacet(parameters)(Component);

        const component = shallow(
          <ApplyComponent
            {...props}
          >
            <div>Content</div>
          </ApplyComponent>,
        );

        component.instance().componentDidMount();

        expect(props.helper.setQueryParameter).toHaveBeenCalledWith(
          'maxValuesPerFacet',
          10,
        );
      });

      it('expect to set maxValuesPerFacet with given value', () => {
        const parameters = {
          ...defaultParameters,
          maxValuesPerFacet: 25,
        };

        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withFacet(parameters)(Component);

        const component = shallow(
          <ApplyComponent
            {...props}
          >
            <div>Content</div>
          </ApplyComponent>,
        );

        component.instance().componentDidMount();

        expect(props.helper.setQueryParameter).toHaveBeenCalledWith(
          'maxValuesPerFacet',
          25,
        );
      });

      it('expect to subscribe to result event', () => {
        const parameters = {
          ...defaultParameters,
        };

        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withFacet(parameters)(Component);

        const component = shallow(
          <ApplyComponent
            {...props}
          >
            <div>Content</div>
          </ApplyComponent>,
        );

        component.instance().componentDidMount();

        expect(props.helper.on).toHaveBeenCalledWith(
          'result',
          component.instance().updateState,
        );
      });
    });

    describe('componentWillUnmount', () => {
      it('expect to unsubscribe to result event', () => {
        const parameters = {
          ...defaultParameters,
        };

        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withFacet(parameters)(Component);

        const component = shallow(
          <ApplyComponent
            {...props}
          >
            <div>Content</div>
          </ApplyComponent>,
        );

        component.instance().componentWillUnmount();

        expect(props.helper.removeListener).toHaveBeenCalledWith(
          'result',
          component.instance().updateState,
        );
      });
    });

    describe('updateState', () => {
      it('expect to sort facet values by default', () => {
        const parameters = {
          ...defaultParameters,
        };

        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withFacet(parameters)(Component);

        const component = shallow(
          <ApplyComponent
            {...props}
          >
            <div>Content</div>
          </ApplyComponent>,
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
        const parameters = {
          ...defaultParameters,
          getFacetValuesOptions: {
            sortBy: ['count:desc'],
          },
        };

        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withFacet(parameters)(Component);

        const component = shallow(
          <ApplyComponent
            {...props}
          >
            <div>Content</div>
          </ApplyComponent>,
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
        const props = {
          helper: createMockAlgoliaHelper(),
        };

        props.helper.getState.mockImplementationOnce(() => ({
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
          <ApplyComponent
            {...props}
          >
            <div>Content</div>
          </ApplyComponent>,
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
          >
            <div>Content</div>
          </ApplyComponent>,
          { context },
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
