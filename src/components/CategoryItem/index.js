import React from 'react';
import PropTypes from 'prop-types';
import { RadioInput } from 'components/Input';
import style from './index.css';

export const FacetValuePropTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  isRefined: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CategoryItem = ({ name, count, isRefined, onChange }) => (
  <li>
    <RadioInput
      customClassName={style.CategoryItem__Label}
      customActiveClassName={style['CategoryItem__Label--active']}
      name="category"
      value={name}
      checked={isRefined}
      onChange={onChange}
    >
      {name}
      <span styleName="CategoryItem__Stat">({count})</span>
    </RadioInput>
  </li>
);

CategoryItem.propTypes = FacetValuePropTypes;

export default CategoryItem;
