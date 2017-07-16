import flowRight from 'lodash.flowright';
import React, { Component } from 'react';
import { getDisplayName } from 'core/utils';
import connect, { ConnectPropTypes } from './connect';

export const withClearRefinements = WrappedComponent => {
  class WithClearRefinements extends Component {

    constructor(props) {
      super(props);

      this.onClear = this.onClear.bind(this);
    }

    onClear() {
      const { helper } = this.props;

      helper
        .clearRefinements()
        .search();
    }

    render() {
      const { helper, ...props } = this.props;

      return (
        <WrappedComponent
          {...props}
          onClear={this.onClear}
        />
      );
    }

  }

  WithClearRefinements.displayName = getDisplayName(
    WrappedComponent,
    'withClearRefinements',
  );

  WithClearRefinements.propTypes = ConnectPropTypes;

  return WithClearRefinements;
};

export default flowRight(
  connect,
  withClearRefinements,
);
