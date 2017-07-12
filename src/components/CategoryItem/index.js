import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxInput } from 'components/Input';
import style from './index.css';

export const FacetValuePropTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  isRefined: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CategoryItem = ({ name, count, isRefined, onChange }) => (
  <li>
    <CheckboxInput
      customClassName={style.CategoryItem__Label}
      customActiveClassName={style['CategoryItem__Label--active']}
      id={`category-${name}`}
      value={name}
      checked={isRefined}
      onChange={() => onChange(
        name,
        isRefined,
      )}
    >
      {name}
      <span styleName="CategoryItem__Stat">({count})</span>
    </CheckboxInput>
  </li>
);

CategoryItem.propTypes = FacetValuePropTypes;

export default CategoryItem;
