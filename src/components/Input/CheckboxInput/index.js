import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './index.css';

const CheckboxInput = ({
  id,
  value,
  checked,
  onChange,
  children,
  customClassName,
  customActiveClassName,
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
      className={cx(customClassName, {
        [customActiveClassName]: checked,
      })}
      styleName={cx('CheckboxInput__Label', {
        'CheckboxInput__Label--active': checked,
      })}
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
  customActiveClassName: PropTypes.string,
};

CheckboxInput.defaultProps = {
  customClassName: '',
  customActiveClassName: '',
};

export default CheckboxInput;
