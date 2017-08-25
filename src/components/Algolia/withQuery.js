import flowRight from 'lodash.flowright';
import React, { Component } from 'react';
import { getDisplayName } from 'core/utils';
import connect, { ConnectPropTypes } from './connect';

export const withQuery = WrappedComponent => {
  class WithQuery extends Component {
    constructor(props) {
      super(props);

      this.state = {
        query: '',
      };

      this.onChange = this.onChange.bind(this);
    }

    onChange(query) {
      this.setState(() => ({
        query,
      }));

      this.props.helper
        .setQuery(query)
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

  WithQuery.displayName = getDisplayName(
    WrappedComponent,
    'withQuery',
  );

  WithQuery.propTypes = ConnectPropTypes;

  return WithQuery;
};

export default flowRight(
  connect,
  withQuery,
);
