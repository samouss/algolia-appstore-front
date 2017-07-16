import flowRight from 'lodash.flowright';
import React, { Component } from 'react';
import { getDisplayName } from 'core/utils';
import connect, { ConnectPropTypes } from './connect';

export const withDisjunctiveFacetRefinement = ({ facet } = {}) => WrappedComponent => {
  if (!facet) {
    throw new Error('You must provide the facet parameter.');
  }

  class WithDisjunctiveFacetRefinement extends Component {

    constructor(props) {
      super(props);

      this.onChange = this.onChange.bind(this);
    }

    onChange(value, isRefined) {
      const { helper } = this.props;

      if (isRefined) {
        return helper
          .removeDisjunctiveFacetRefinement(facet)
          .search();
      }

      helper
        .removeDisjunctiveFacetRefinement(facet)
        .addDisjunctiveFacetRefinement(facet, value)
        .search();
    }

    render() {
      const { helper, ...props } = this.props;

      return (
        <WrappedComponent
          {...props}
          onChange={this.onChange}
        />
      );
    }

  }

  WithDisjunctiveFacetRefinement.displayName = getDisplayName(
    WrappedComponent,
    'withDisjunctiveFacetRefinement',
  );

  WithDisjunctiveFacetRefinement.propTypes = ConnectPropTypes;

  return WithDisjunctiveFacetRefinement;
};

export default (...args) => flowRight(
  connect,
  withDisjunctiveFacetRefinement(...args),
);
