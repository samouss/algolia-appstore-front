import React, { Component } from 'react';
import { getDisplayName } from 'core/utils';
import { ContextTypes } from './Provider';

const withDisjunctiveFacetRefinement = ({ facet } = {}) => WrappedComponent => {
  if (!facet) {
    throw new Error('You must provide the facet parameter.');
  }

  class WithDisjunctiveFacetRefinement extends Component {

    constructor(props) {
      super(props);

      this.onChange = this.onChange.bind(this);
    }

    onChange(value, isRefined) {
      const { algoliaHelper } = this.context;

      if (isRefined) {
        return algoliaHelper
          .removeDisjunctiveFacetRefinement(facet)
          .search();
      }

      algoliaHelper
        .removeDisjunctiveFacetRefinement(facet)
        .addDisjunctiveFacetRefinement(facet, value)
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
