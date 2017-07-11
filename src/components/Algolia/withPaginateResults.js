import React, { Component } from 'react';
import { getDisplayName } from 'core/utils';
import { ContextTypes } from './Provider';

const withPaginateResults = ({
  hitsPerPage = 25,
} = {}) => WrappedComponent => {
  class WithPaginateResults extends Component {

    constructor(props) {
      super(props);

      this.state = {
        hits: [],
        nbHits: 0,
        nbPages: 0,
        page: 1,
        processingTimeMS: 0,
        isLoading: true,
        isInitialLoad: true,
        isEndReached: false,
      };

      this.onNextPage = this.onNextPage.bind(this);
      this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
      const { algoliaHelper } = this.context;

      algoliaHelper.setQueryParameter(
        'hitsPerPage',
        hitsPerPage,
      );

      algoliaHelper.on('result', this.updateState);
    }

    componentWillUnmount() {
      this.context.algoliaHelper.removeListener('result', this.updateState);
    }

    onNextPage() {
      const { page, nbPages, isEndReached } = this.state;

      if (isEndReached) {
        return;
      }

      const newPage = page + 1;
      const isLastPage = newPage === nbPages;

      this.setState(() => ({
        isEndReached: isLastPage,
        isLoading: true,
      }));

      this.context.algoliaHelper
        .nextPage()
        .search();
    }

    updateState(content) {
      this.setState(prevState => ({
        hits: prevState.hits.concat(content.hits),
        nbHits: content.nbHits,
        nbPages: content.nbPages,
        page: content.page + 1,
        processingTimeMS: content.processingTimeMS,
        isLoading: false,
        isInitialLoad: false,
      }));
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          onNextPage={this.onNextPage}
        />
      );
    }

  }

  WithPaginateResults.displayName = getDisplayName(
    WrappedComponent,
    'withPaginateResults',
  );

  WithPaginateResults.contextTypes = ContextTypes;

  return WithPaginateResults;
};

export default withPaginateResults;
