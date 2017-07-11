import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import { createMockAlgoliaClient, createMockAlgoliaHelper } from 'test/algolia';
import withPaginateResults from '../withPaginateResults';

describe('algolia', () => {
  describe('<Provider />', () => {
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

      const ApplyComponent = withPaginateResults()(Component);

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
        const ApplyComponent = withPaginateResults()(Component);

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
        const ApplyComponent = withPaginateResults({
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
        const ApplyComponent = withPaginateResults()(Component);

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
        const ApplyComponent = withPaginateResults()(Component);

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
        const ApplyComponent = withPaginateResults()(Component);

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

      it('expect to call nextPage on last page and search', () => {
        const context = createContext();
        const ApplyComponent = withPaginateResults()(Component);

        const component = shallow(
          <ApplyComponent>
            <div>Content</div>
          </ApplyComponent>,
          { context },
        );

        component.setState({
          nbPages: 5,
          page: 4,
        });

        // @NOTE: simulate initial load
        component.setState({ isLoading: false });

        component.instance().onNextPage();

        expect(component.state().isLoading).toBe(true);
        expect(component.state().isEndReached).toBe(true);
        expect(context.algoliaHelper.nextPage).toHaveBeenCalled();
        expect(context.algoliaHelper.search).toHaveBeenCalled();
      });

      it('expect to not call nextPage and search', () => {
        const context = createContext();
        const ApplyComponent = withPaginateResults()(Component);

        const component = shallow(
          <ApplyComponent>
            <div>Content</div>
          </ApplyComponent>,
          { context },
        );

        component.setState({
          isEndReached: true,
        });

        // @NOTE: simulate initial load
        component.setState({ isLoading: false });

        component.instance().onNextPage();

        expect(component.state().isLoading).toBe(false);
        expect(context.algoliaHelper.nextPage).not.toHaveBeenCalled();
        expect(context.algoliaHelper.search).not.toHaveBeenCalled();
      });
    });

    describe('updateState', () => {
      it('expect to update the state from aloglia result', () => {
        const context = createContext();
        const ApplyComponent = withPaginateResults()(Component);

        const component = shallow(
          <ApplyComponent>
            <div>Content</div>
          </ApplyComponent>,
          { context },
        );

        const content = {
          hits: [
            { objectID: '123' },
            { objectID: '456' },
          ],
          nbHits: 1250,
          nbPages: 20,
          page: 5,
          processingTimeMS: 5,
        };

        const expectation = {
          hits: [
            { objectID: '123' },
            { objectID: '456' },
          ],
          nbHits: 1250,
          nbPages: 20,
          page: 6,
          processingTimeMS: 5,
          isLoading: false,
          isInitialLoad: false,
          isEndReached: false,
        };

        component.instance().updateState(content);

        expect(component.state()).toEqual(expectation);
      });
    });
  });
});
