import { Component, Children } from 'react';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';

export const ContextTypes = {
  algoliaClient: PropTypes.object.isRequired,
  algoliaHelper: PropTypes.object.isRequired,
};

class Provider extends Component {

  constructor(props) {
    super(props);

    this.client = algoliasearch(props.appId, props.apiKey);
    this.helper = algoliasearchHelper(this.client, props.indexName);
  }

  getChildContext() {
    return {
      algoliaClient: this.client,
      algoliaHelper: this.helper,
    };
  }

  componentDidMount() {
    this.helper.search();
  }

  render() {
    return Children.only(this.props.children);
  }

}

Provider.propTypes = {
  appId: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  indexName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Provider.childContextTypes = ContextTypes;

export default Provider;
