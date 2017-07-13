import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Container = ({ children }) => (
  <div styleName="Container">
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
