import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const TextInput = ({ value, onChange, ...props }) => (
  <input
    {...props}
    styleName="TextInput"
    value={value}
    onChange={onChange}
  />
);

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextInput;
