import React from 'react';
import PropTypes from 'prop-types';
import CategoryItem from 'components/CategoryItem';
import './index.css';

const CategoryList = ({ facetValues, onChange }) => (
  <ul styleName="CategoryList">
    {facetValues.map(facetValue => (
      <CategoryItem
        key={facetValue.name}
        name={facetValue.name}
        count={facetValue.count}
        isRefined={facetValue.isRefined}
        onChange={onChange}
      />
    ))}
  </ul>
);

CategoryList.propTypes = {
  facetValues: PropTypes.arrayOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CategoryList;
