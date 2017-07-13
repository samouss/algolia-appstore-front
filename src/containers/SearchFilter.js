import React from 'react';
import PropTypes from 'prop-types';
import { withQuery } from 'components/Algolia';
import TextInput from 'components/TextInput';

export const SearchFilter = ({ query, onChange, ...props }) => (
  <TextInput
    {...props}
    value={query}
    onChange={event => onChange(event.currentTarget.value)}
    placeholder="Angry Birds, Cut the Rope, Pinterest..."
  />
);

SearchFilter.propTypes = {
  query: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withQuery(SearchFilter);
