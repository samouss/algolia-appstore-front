import flowRight from 'lodash.flowright';
import React, { Component } from 'react';
import { getDisplayName } from 'core/utils';
import connect, { ConnectPropTypes } from './connect';

export const withFacet = ({
  facet,
  maxValuesPerFacet = 10,
  getFacetValuesOptions = {},
  reduceFacetValues = x => x,
} = {}) => WrappedComponent => {
  if (!facet) {
    throw new Error('You must provide the facet parameter.');
  }

  class WithFacet extends Component {
    constructor(props) {
      super(props);

      this.state = {
        facetValues: [],
      };

      this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
      const { helper } = this.props;

      helper.setQueryParameter('maxValuesPerFacet', maxValuesPerFacet);

      helper.on('result', this.updateState);
    }

    componentWillUnmount() {
      this.props.helper.removeListener('result', this.updateState);
    }

    updateState(content) {
      const { helper } = this.props;

      const facetValues = content.getFacetValues(
        facet,
        getFacetValuesOptions,
      );

      const facetValuesReduced = reduceFacetValues(
        facetValues,
        helper.getState(),
      );

      this.setState(() => ({
        facetValues: facetValuesReduced,
      }));
    }

    render() {
      const { helper, ...props } = this.props;

      return (
        <WrappedComponent
          {...props}
          {...this.state}
        />
      );
    }
  }

  WithFacet.displayName = getDisplayName(
    WrappedComponent,
    'withFacet',
  );

  WithFacet.propTypes = ConnectPropTypes;

  return WithFacet;
};

export default (...args) => flowRight(
  connect,
  withFacet(...args),
);
