import React, { Component } from 'react';
import { getDisplayName } from 'core/utils';
import { ContextTypes } from './Provider';

const withQuery = WrappedComponent => {
  class WithQuery extends Component {

    constructor(props) {
      super(props);

      this.state = {
        query: '',
      };

      this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
      const query = event.currentTarget.value;

      this.setState(() => ({
        query,
      }));

      this.context.algoliaHelper
        .setQuery(query)
        .search();
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
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

  WithQuery.contextTypes = ContextTypes;

  return WithQuery;
};

export default withQuery;
