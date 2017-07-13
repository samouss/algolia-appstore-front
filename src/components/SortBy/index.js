import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const SortBy = ({ children }) => (
  <div>
    <p styleName="SortBy__Label">
      Sort by:
    </p>
    {children}
  </div>
);

SortBy.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SortBy;
