import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import connect, { withInfiniteHits } from '../withInfiniteHits';

describe('algolia', () => {
  describe('withInfiniteHits', () => {
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

      const ApplyComponent = withInfiniteHits()(Component);

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
      const ApplyComponent = withInfiniteHits()(Component);

      const expectation = 'withInfiniteHits(Component)';
      const actual = ApplyComponent.displayName;

      expect(actual).toBe(expectation);
    });

    describe('componentDidMount', () => {
      it('expect to call setQueryParameter with default parameter', () => {
        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withInfiniteHits()(Component);

        const component = shallow(
          <ApplyComponent
            {...props}
          >
            <div>Content</div>
          </ApplyComponent>,
        );

        component.instance().componentDidMount();

        expect(props.helper.setQueryParameter).toHaveBeenCalledWith(
          'hitsPerPage',
          25,
        );
      });

      it('expect to call setQueryParameter with given parameter', () => {
        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withInfiniteHits({
          hitsPerPage: 50,
        })(Component);

        const component = shallow(
          <ApplyComponent
            {...props}
          >
            <div>Content</div>
          </ApplyComponent>,
        );

        component.instance().componentDidMount();

        expect(props.helper.setQueryParameter).toHaveBeenCalledWith(
          'hitsPerPage',
          50,
        );
      });

      it('expect to subscribe to result event', () => {
        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withInfiniteHits()(Component);

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

        const ApplyComponent = withInfiniteHits()(Component);

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

    describe('onNextPage', () => {
      it('expect to call nextPage and search', () => {
        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withInfiniteHits()(Component);

        const component = shallow(
          <ApplyComponent
            {...props}
          >
            <div>Content</div>
          </ApplyComponent>,
        );

        // @NOTE: simulate initial load
        component.setState({ isLoading: false });

        component.instance().onNextPage();

        expect(component.state().isLoading).toBe(true);
        expect(component.state().isEndReached).toBe(false);
        expect(props.helper.nextPage).toHaveBeenCalled();
        expect(props.helper.search).toHaveBeenCalled();
      });

      it('expect to not call nextPage and search if loading', () => {
        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withInfiniteHits()(Component);

        const component = shallow(
          <ApplyComponent
            {...props}
          >
            <div>Content</div>
          </ApplyComponent>,
        );

        component.setState({
          isEndReached: true,
        });

        component.setState({ isLoading: true });

        component.instance().onNextPage();

        expect(props.helper.nextPage).not.toHaveBeenCalled();
        expect(props.helper.search).not.toHaveBeenCalled();
      });

      it('expect to not call nextPage and search if end reached', () => {
        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withInfiniteHits()(Component);

        const component = shallow(
          <ApplyComponent
            {...props}
          >
            <div>Content</div>
          </ApplyComponent>,
        );

        component.setState({
          isEndReached: true,
          isLoading: false,
        });

        component.instance().onNextPage();

        expect(props.helper.nextPage).not.toHaveBeenCalled();
        expect(props.helper.search).not.toHaveBeenCalled();
      });
    });

    describe('updateState', () => {
      it('expect to update with concatenate hits', () => {
        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withInfiniteHits()(Component);

        const component = shallow(
          <ApplyComponent
            {...props}
          >
            <div>Content</div>
          </ApplyComponent>,
        );

        const prevState = {
          hits: [
            { objectID: '123' },
            { objectID: '456' },
          ],
          nbHits: 1250,
          nbPages: 20,
          page: 5,
          processingTimeMS: 5,
        };

        const content = {
          hits: [
            { objectID: '789' },
            { objectID: '101' },
          ],
          nbHits: 1250,
          nbPages: 20,
          page: 6,
          processingTimeMS: 5,
        };

        const expectation = {
          hits: [
            { objectID: '123' },
            { objectID: '456' },
            { objectID: '789' },
            { objectID: '101' },
          ],
          nbHits: 1250,
          nbPages: 20,
          page: 6,
          processingTimeMS: 5,
          isLoading: false,
          isInitialLoad: false,
          isEndReached: false,
        };

        component.setState(prevState);

        component.instance().updateState(content);

        expect(component.state()).toEqual(expectation);
      });

      it('expect to update with hits', () => {
        const props = {
          helper: createMockAlgoliaHelper(),
        };

        const ApplyComponent = withInfiniteHits()(Component);

        const component = shallow(
          <ApplyComponent
            {...props}
          >
            <div>Content</div>
          </ApplyComponent>,
        );

        const prevState = {
          hits: [
            { objectID: '123' },
            { objectID: '456' },
          ],
          nbHits: 1250,
          nbPages: 20,
          page: 5,
          processingTimeMS: 5,
        };

        const content = {
          hits: [
            { objectID: '789' },
            { objectID: '101' },
          ],
          nbHits: 1250,
          nbPages: 20,
          page: 0,
          processingTimeMS: 5,
        };

        const expectation = {
          hits: [
            { objectID: '789' },
            { objectID: '101' },
          ],
          nbHits: 1250,
          nbPages: 20,
          page: 0,
          processingTimeMS: 5,
          isLoading: false,
          isInitialLoad: false,
          isEndReached: false,
        };

        component.setState(prevState);

        component.instance().updateState(content);

        expect(component.state()).toEqual(expectation);
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

        const ApplyComponent = connect()(Component);

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
