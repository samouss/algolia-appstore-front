import React, { Component } from 'react';
import { getDisplayName } from 'core/utils';
import { ContextTypes } from './Provider';

const withDisjunctiveFacetRefinement = ({
  facet,
} = {}) => WrappedComponent => {
  class WithDisjunctiveFacetRefinement extends Component {

    constructor(props) {
      super(props);

      this.onChange = this.onChange.bind(this);
    }

    onChange(facetValue, isRefined) {
      const { algoliaHelper } = this.context;

      if (isRefined) {
        return algoliaHelper
          .removeDisjunctiveFacetRefinement(facet)
          .search();
      }

      algoliaHelper
        .removeDisjunctiveFacetRefinement(facet)
        .addDisjunctiveFacetRefinement(facet, facetValue)
        .search();
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          onChange={this.onChange}
        />
      );
    }

  }

  WithDisjunctiveFacetRefinement.displayName = getDisplayName(
    WrappedComponent,
    'withDisjunctiveFacetRefinement',
  );

  WithDisjunctiveFacetRefinement.contextTypes = ContextTypes;

  return WithDisjunctiveFacetRefinement;
};

export default withDisjunctiveFacetRefinement;
