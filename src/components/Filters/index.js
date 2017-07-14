import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Filters = ({ children }) => (
  <div styleName="Filters">
    {children}
  </div>
);

Filters.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Filters;
