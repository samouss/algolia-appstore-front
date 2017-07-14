import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Layout = ({ children }) => (
  <div styleName="Layout">
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
