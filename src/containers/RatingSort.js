import React from 'react';
import PropTypes from 'prop-types';
import { ALGOLIA_INDEX_NAME_DESC, ALGOLIA_INDEX_NAME_ASC } from 'env';
import { withIndex } from 'components/Algolia';
import FilterList from 'components/FilterList';
import FilterItem from 'components/FilterItem';

export const RatingSort = ({ indexName, onChange }) => (
  <FilterList>
    <FilterItem
      isRefined={indexName === ALGOLIA_INDEX_NAME_DESC}
      onChange={() => onChange(ALGOLIA_INDEX_NAME_DESC)}
    >
      By highest rating
    </FilterItem>
    <FilterItem
      isRefined={indexName === ALGOLIA_INDEX_NAME_ASC}
      onChange={() => onChange(ALGOLIA_INDEX_NAME_ASC)}
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
