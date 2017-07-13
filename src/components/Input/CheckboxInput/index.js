import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const CheckboxInput = ({
  id,
  value,
  checked,
  onChange,
  children,
  customClassName,
}) => (
  <div styleName="CheckboxInput">
    <input
      styleName="CheckboxInput__Input"
      id={id}
      value={value}
      type="checkbox"
      onChange={onChange}
      checked={checked}
    />
    <label
      htmlFor={id}
      className={customClassName}
      styleName="CheckboxInput__Label"
    >
      {children}
    </label>
  </div>
);

CheckboxInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  customClassName: PropTypes.string,
};

CheckboxInput.defaultProps = {
  customClassName: '',
};

export default CheckboxInput;
