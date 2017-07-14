import React, { Component } from 'react';
import { getDisplayName } from 'core/utils';
import { ContextTypes } from './Provider';

const withNumericRefinement = ({
  attribute,
  operator,
} = {}) => WrappedComponent => {
  if (!attribute) {
    throw new Error('You must provide the attribute parameter.');
  }

  if (!operator) {
    throw new Error('You must provide the operator parameter.');
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
          .removeNumericRefinement(attribute)
          .search();
      }

      algoliaHelper
        .removeNumericRefinement(attribute)
        .addNumericRefinement(attribute, operator, value)
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
    'withNumericRefinement',
  );

  WithDisjunctiveFacetRefinement.contextTypes = ContextTypes;

  return WithDisjunctiveFacetRefinement;
};

export default withNumericRefinement;
