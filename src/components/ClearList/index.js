import React from 'react';
import PropTypes from 'prop-types';
import FilterList from 'components/FilterList';
import FilterItem from 'components/FilterItem';
import style from './index.css';

const ClearList = ({ refinements, onClear }) => {
  if (!refinements.length) {
    return null;
  }

  return (
    <FilterList>
      <FilterItem
        customClassName={style.ClearList__Item}
        isRefined={false}
        onChange={onClear}
      >
        <i className="fa fa-times-circle" />
        Clear filter(s)
      </FilterItem>
    </FilterList>
  );
};

ClearList.propTypes = {
  refinements: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClear: PropTypes.func.isRequired,
};

export default ClearList;
