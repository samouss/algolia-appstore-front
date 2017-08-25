import flowRight from 'lodash.flowright';
import React, { Component } from 'react';
import { getDisplayName } from 'core/utils';
import connect, { ConnectPropTypes } from './connect';

export const withIndex = WrappedComponent => {
  class WithIndex extends Component {
    constructor(props) {
      super(props);

      this.state = {
        indexName: props.helper.getIndex(),
      };

      this.onChange = this.onChange.bind(this);
    }

    onChange(indexName) {
      this.setState(() => ({
        indexName,
      }));

      this.props.helper
        .setIndex(indexName)
        .search();
    }

    render() {
      const { helper, ...props } = this.props;

      return (
        <WrappedComponent
          {...props}
          {...this.state}
          onChange={this.onChange}
        />
      );
    }
  }

  WithIndex.displayName = getDisplayName(
    WrappedComponent,
    'withIndex',
  );

  WithIndex.propTypes = ConnectPropTypes;

  return WithIndex;
};

export default flowRight(
  connect,
  withIndex,
);
