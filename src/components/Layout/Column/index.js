import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Column = ({ children }) => (
  <div styleName="Column">
    {children}
  </div>
);

Column.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Column;
