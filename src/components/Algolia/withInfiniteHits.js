import React, { Component } from 'react';
import { getDisplayName } from 'core/utils';
import { ContextTypes } from './Provider';

const withInfiniteHits = ({
  hitsPerPage = 25,
} = {}) => WrappedComponent => {
  class WithInfiniteHits extends Component {

    constructor(props) {
      super(props);

      this.state = {
        hits: [],
        nbHits: 0,
        nbPages: 0,
        page: 0,
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
      const { isLoading, isEndReached } = this.state;

      if (isLoading || isEndReached) {
        return;
      }

      this.setState(() => ({
        isLoading: true,
      }));

      this.context.algoliaHelper
        .nextPage()
        .search();
    }

    updateState(content) {
      const isResetResults = content.page === 0;
      const isEndReached = content.page === content.nbPages - 1;

      this.setState(prevState => ({
        hits: isResetResults ? content.hits
          : prevState.hits.concat(content.hits),
        nbHits: content.nbHits,
        nbPages: content.nbPages,
        page: content.page,
        processingTimeMS: content.processingTimeMS,
        isLoading: false,
        isInitialLoad: false,
        isEndReached,
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

  WithInfiniteHits.displayName = getDisplayName(
    WrappedComponent,
    'withInfiniteHits',
  );

  WithInfiniteHits.contextTypes = ContextTypes;

  return WithInfiniteHits;
};

export default withInfiniteHits;
