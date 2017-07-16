import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import connect, { withRefinements } from '../withRefinements';

describe('algolia', () => {
  describe('withRefinements', () => {
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
      const props = {
        className: 'sample-class-name',
        helper: createMockAlgoliaHelper(),
      };

      const ApplyComponent = withRefinements(Component);

      const component = shallow(
        <ApplyComponent
          {...props}
        >
          <div>Content</div>
        </ApplyComponent>,
      );

      expect(component).toMatchSnapshot();
    });

    it('expect to have correct displayName', () => {
      const ApplyComponent = withRefinements(Component);

      const expectation = 'withRefinements(Component)';
      const actual = ApplyComponent.displayName;

      expect(actual).toBe(expectation);
    });

    describe('componentDidMount', () => {
      it('expect to subscribe to result event', () => {
        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withRefinements(Component);

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
        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withRefinements(Component);

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
      it('expect to call getRefinements', () => {
        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const content = {
          getRefinements: jest.fn(),
        };

        const ApplyComponent = withRefinements(Component);

        const component = shallow(
          <ApplyComponent
            {...props}
          >
            <div>Content</div>
          </ApplyComponent>,
        );

        component.instance().updateState(content);

        expect(content.getRefinements).toHaveBeenCalled();
      });

      it('expect to call setState with refinements', () => {
        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const content = {
          getRefinements: jest.fn(() => [
            { name: 'category' },
            { name: 'rating' },
          ]),
        };

        const ApplyComponent = withRefinements(Component);

        const component = shallow(
          <ApplyComponent
            {...props}
          >
            <div>Content</div>
          </ApplyComponent>,
        );

        component.instance().updateState(content);

        expect(component.state().refinements).toEqual([
          { name: 'category' },
          { name: 'rating' },
        ]);
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
