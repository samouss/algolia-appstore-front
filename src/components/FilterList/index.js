import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const FilterList = ({ customClassName, children }) => (
  <ul
    className={customClassName}
    styleName="FilterList"
  >
    {children}
  </ul>
);

FilterList.propTypes = {
  children: PropTypes.node.isRequired,
  customClassName: PropTypes.string,
};

FilterList.defaultProps = {
  customClassName: '',
};

export default FilterList;
