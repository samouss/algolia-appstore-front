import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Button = ({ to, children, ...props }) => (
  <a
    {...props}
    href={to}
    styleName="Button"
  >
    {children}
  </a>
);

Button.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
