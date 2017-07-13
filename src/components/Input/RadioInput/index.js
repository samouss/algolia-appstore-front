import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const RadioInput = ({
  id,
  name,
  value,
  checked,
  onChange,
  children,
  customClassName,
}) => (
  <div styleName="RadioInput">
    <input
      styleName="RadioInput__Input"
      id={id}
      name={name}
      value={value}
      type="radio"
      onChange={onChange}
      checked={checked}
    />
    <label
      htmlFor={id}
      className={customClassName}
      styleName="RadioInput__Label"
    >
      <span styleName="RadioInput__Radio">
        <span styleName="RadioInput__Radio__Inner" />
      </span>

      {children}
    </label>
  </div>
);

RadioInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  customClassName: PropTypes.string,
};

RadioInput.defaultProps = {
  customClassName: '',
};

export default RadioInput;
