import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './index.css';

const RadioInput = ({
  name,
  value,
  checked,
  onChange,
  children,
  customClassName,
  customActiveClassName,
}) => (
  <div styleName="RadioInput">
    <input
      styleName="RadioInput__Input"
      id={`${name}-${value}`}
      name={name}
      type="radio"
      onChange={onChange}
      checked={checked}
    />
    <label
      htmlFor={`${name}-${value}`}
      className={cx(customClassName, {
        [customActiveClassName]: checked,
      })}
      styleName={cx('RadioInput__Label', {
        'RadioInput__Label--active': checked,
      })}
    >
      {children}
    </label>
  </div>
);

RadioInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  customClassName: PropTypes.string,
  customActiveClassName: PropTypes.string,
};

RadioInput.defaultProps = {
  customClassName: '',
  customActiveClassName: '',
};

export default RadioInput;
