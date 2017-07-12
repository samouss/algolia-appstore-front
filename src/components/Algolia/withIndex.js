import React, { Component } from 'react';
import { getDisplayName } from 'core/utils';
import { ContextTypes } from './Provider';

const withIndex = WrappedComponent => {
  class WithIndex extends Component {

    constructor(props, context) {
      super(props, context);

      this.state = {
        indexName: context.algoliaHelper.getIndex(),
      };

      this.onChange = this.onChange.bind(this);
    }

    onChange(indexName) {
      this.setState(() => ({
        indexName,
      }));

      this.context.algoliaHelper
        .setIndex(indexName)
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

  WithIndex.displayName = getDisplayName(
    WrappedComponent,
    'withIndex',
  );

  WithIndex.contextTypes = ContextTypes;

  return WithIndex;
};

export default withIndex;
