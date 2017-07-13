import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Counter = ({ value, customClassName }) => (
  <span
    className={customClassName}
    styleName="Counter"
  >
    {value.toLocaleString()}
  </span>
);

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  customClassName: PropTypes.string,
};

Counter.defaultProps = {
  customClassName: '',
};

export default Counter;
