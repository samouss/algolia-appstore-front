import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Header = ({ title }) => (
  <h1 styleName="container">
    React Starter, {title}
  </h1>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
