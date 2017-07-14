import React from 'react';
import PropTypes from 'prop-types';
import FilterList from 'components/FilterList';
import FilterItem from 'components/FilterItem';
import Counter from 'components/Counter';
import style from './index.css';

const CategoryList = ({ facetValues, onChange }) => (
  <FilterList
    customClassName={style.CategoryList}
  >
    {facetValues.map(({ name, count, isRefined }) => (
      <FilterItem
        key={name}
        value={name}
        isRefined={isRefined}
        onChange={() => onChange(name, isRefined)}
      >
        <span>{name}</span>

        <Counter
          value={count}
        />
      </FilterItem>
    ))}
  </FilterList>
);

CategoryList.propTypes = {
  facetValues: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    isRefined: PropTypes.bool.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CategoryList;
