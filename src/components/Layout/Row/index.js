import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Row = ({ children }) => (
  <div styleName="Row">
    {children}
  </div>
);

Row.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Row;
