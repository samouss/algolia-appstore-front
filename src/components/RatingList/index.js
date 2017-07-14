import React from 'react';
import PropTypes from 'prop-types';
import FilterList from 'components/FilterList';
import FilterItem from 'components/FilterItem';
import Stars from 'components/Stars';
import Counter from 'components/Counter';
import style from './index.css';

const RatingList = ({ facetValues, onChange }) => (
  <FilterList
    customClassName={style.RatingList}
  >
    {facetValues.map(({ name, count, isRefined }) => (
      <FilterItem
        key={name}
        isRefined={isRefined}
        onChange={() => onChange(name, isRefined)}
      >
        <Stars
          value={parseInt(name, 10)}
          on={5}
        />

        <Counter
          value={count}
        />
      </FilterItem>
    ))}
  </FilterList>
);

RatingList.propTypes = {
  facetValues: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    isRefined: PropTypes.bool.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RatingList;
