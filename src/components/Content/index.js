import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Header = ({ message }) => (
  <p styleName="container">
    Hello from {message} !!
  </p>
);

Header.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Header;
