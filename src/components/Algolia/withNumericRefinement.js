import flowRight from 'lodash.flowright';
import React, { Component } from 'react';
import { getDisplayName } from 'core/utils';
import connect, { ConnectPropTypes } from './connect';

export const withNumericRefinement = ({
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
      const { helper } = this.props;

      if (isRefined) {
        return helper
          .removeNumericRefinement(attribute)
          .search();
      }

      helper
        .removeNumericRefinement(attribute)
        .addNumericRefinement(attribute, operator, value)
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
    'withNumericRefinement',
  );

  WithDisjunctiveFacetRefinement.propTypes = ConnectPropTypes;

  return WithDisjunctiveFacetRefinement;
};

export default (...args) => flowRight(
  connect,
  withNumericRefinement(...args),
);
