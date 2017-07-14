import React from 'react';
import PropTypes from 'prop-types';
import { withIndex } from 'components/Algolia';
import FilterList from 'components/FilterList';
import FilterItem from 'components/FilterItem';

export const RatingSort = ({ indexName, onChange }) => (
  <FilterList>
    <FilterItem
      value="apps_rating_desc"
      isRefined={indexName === 'apps_rating_desc'}
      onChange={() => onChange('apps_rating_desc')}
    >
      By highest rating
    </FilterItem>
    <FilterItem
      value="apps_rating_asc"
      isRefined={indexName === 'apps_rating_asc'}
      onChange={() => onChange('apps_rating_asc')}
    >
      By lowest rating
    </FilterItem>
  </FilterList>
);

RatingSort.propTypes = {
  indexName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withIndex(RatingSort);
