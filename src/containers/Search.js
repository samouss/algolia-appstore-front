import React from 'react';
import PropTypes from 'prop-types';
import { withQuery } from 'components/Algolia';
import TextInput from 'components/TextInput';

export const Search = ({ query, ...props }) => (
  <TextInput
    {...props}
    value={query}
    placeholder="Angry Birds, Cut the Rope, Pinterest..."
  />
);

Search.propTypes = {
  query: PropTypes.string.isRequired,
};

export default withQuery(Search);
