import React from 'react';
import PropTypes from 'prop-types';
import { withQuery } from 'components/Algolia';
import { TextInput } from 'components/Input';

export const Search = ({ query, onChange, ...props }) => (
  <TextInput
    {...props}
    value={query}
    onChange={event => onChange(event.currentTarget.value)}
    placeholder="Angry Birds, Cut the Rope, Pinterest..."
  />
);

Search.propTypes = {
  query: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withQuery(Search);
