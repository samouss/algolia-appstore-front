import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import withInfiniteHits from '../withInfiniteHits';

describe('algolia', () => {
  describe('withInfiniteHits', () => {
    const createContext = () => ({
      algoliaHelper: createMockAlgoliaHelper(),
      algoliaClient: createMockAlgoliaClient(),
    });

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

      const props = {
        className: 'sample-class-name',
      };

      const ApplyComponent = withInfiniteHits()(Component);

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

    describe('componentDidMount', () => {
      it('expect to call setQueryParameter with default parameter', () => {
        const context = createContext();
        const ApplyComponent = withInfiniteHits()(Component);

        const component = shallow(
          <ApplyComponent>
            <div>Content</div>
          </ApplyComponent>,
          { context },
        );

        component.instance().componentDidMount();

        expect(context.algoliaHelper.setQueryParameter).toHaveBeenCalledWith(
          'hitsPerPage',
          25,
        );
      });

      it('expect to call setQueryParameter with given parameter', () => {
        const context = createContext();
        const ApplyComponent = withInfiniteHits({
          hitsPerPage: 50,
        })(Component);

        const component = shallow(
          <ApplyComponent>
            <div>Content</div>
          </ApplyComponent>,
          { context },
        );

        component.instance().componentDidMount();

        expect(context.algoliaHelper.setQueryParameter).toHaveBeenCalledWith(
          'hitsPerPage',
          50,
        );
      });

      it('expect to subscribe to result event', () => {
        const context = createContext();
        const ApplyComponent = withInfiniteHits()(Component);

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
        const ApplyComponent = withInfiniteHits()(Component);

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

    describe('onNextPage', () => {
      it('expect to call nextPage and search', () => {
        const context = createContext();
        const ApplyComponent = withInfiniteHits()(Component);

        const component = shallow(
          <ApplyComponent>
            <div>Content</div>
          </ApplyComponent>,
          { context },
        );

        // @NOTE: simulate initial load
        component.setState({ isLoading: false });

        component.instance().onNextPage();

        expect(component.state().isLoading).toBe(true);
        expect(component.state().isEndReached).toBe(false);
        expect(context.algoliaHelper.nextPage).toHaveBeenCalled();
        expect(context.algoliaHelper.search).toHaveBeenCalled();
      });

      it('expect to not call nextPage and search if loading', () => {
        const context = createContext();
        const ApplyComponent = withInfiniteHits()(Component);

        const component = shallow(
          <ApplyComponent>
            <div>Content</div>
          </ApplyComponent>,
          { context },
        );

        component.setState({
          isEndReached: true,
        });

        component.setState({ isLoading: true });

        component.instance().onNextPage();

        expect(context.algoliaHelper.nextPage).not.toHaveBeenCalled();
        expect(context.algoliaHelper.search).not.toHaveBeenCalled();
      });

      it('expect to not call nextPage and search if end reached', () => {
        const context = createContext();
        const ApplyComponent = withInfiniteHits()(Component);

        const component = shallow(
          <ApplyComponent>
            <div>Content</div>
          </ApplyComponent>,
          { context },
        );

        component.setState({
          isEndReached: true,
          isLoading: false,
        });

        component.instance().onNextPage();

        expect(context.algoliaHelper.nextPage).not.toHaveBeenCalled();
        expect(context.algoliaHelper.search).not.toHaveBeenCalled();
      });
    });

    describe('updateState', () => {
      it('expect to update with concatenate hits', () => {
        const context = createContext();
        const ApplyComponent = withInfiniteHits()(Component);

        const component = shallow(
          <ApplyComponent>
            <div>Content</div>
          </ApplyComponent>,
          { context },
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
        const context = createContext();
        const ApplyComponent = withInfiniteHits()(Component);

        const component = shallow(
          <ApplyComponent>
            <div>Content</div>
          </ApplyComponent>,
          { context },
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
  });
});
