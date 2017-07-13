import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Advanced = ({ children }) => (
  <div styleName="Advanced">
    {children}
  </div>
);

Advanced.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Advanced;
