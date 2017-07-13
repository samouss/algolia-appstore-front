import React from 'react';
import PropTypes from 'prop-types';
import { withIndex } from 'components/Algolia';
import { RadioInput } from 'components/Input';
import SortBy from 'components/SortBy';

export const RatingSort = ({ indexName, onChange }) => (
  <SortBy>
    <RadioInput
      id="sort-desc"
      name="sort"
      value="apps_rating_desc"
      checked={indexName === 'apps_rating_desc'}
      onChange={event => onChange(event.currentTarget.value)}
    >
      Highest rating
    </RadioInput>
    <RadioInput
      id="sort-asc"
      name="sort"
      value="apps_rating_asc"
      checked={indexName === 'apps_rating_asc'}
      onChange={event => onChange(event.currentTarget.value)}
    >
      Lowest rating
    </RadioInput>
  </SortBy>
);

RatingSort.propTypes = {
  indexName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withIndex(RatingSort);
