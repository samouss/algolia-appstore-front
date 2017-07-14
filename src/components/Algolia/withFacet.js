import React, { Component } from 'react';
import { getDisplayName } from 'core/utils';
import { ContextTypes } from './Provider';

const withFacet = ({
  facet,
  maxValuesPerFacet = 10,
  getFacetValuesOptions = {},
  reduceFacetValues = x => x,
}) => WrappedComponent => {
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
      const { algoliaHelper } = this.context;

      algoliaHelper.setQueryParameter('maxValuesPerFacet', maxValuesPerFacet);

      algoliaHelper.on('result', this.updateState);
    }

    componentWillUnmount() {
      this.context.algoliaHelper.removeListener('result', this.updateState);
    }

    updateState(content) {
      const { algoliaHelper } = this.context;

      const facetValues = content.getFacetValues(
        facet,
        getFacetValuesOptions,
      );

      const facetValuesReduced = reduceFacetValues(
        facetValues,
        algoliaHelper.getState(),
      );

      this.setState(() => ({
        facetValues: facetValuesReduced,
      }));
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
        />
      );
    }

  }

  WithFacet.displayName = getDisplayName(
    WrappedComponent,
    'withFacet',
  );

  WithFacet.contextTypes = ContextTypes;

  return WithFacet;
};

export default withFacet;
