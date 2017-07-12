import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './index.css';

const TextInput = ({ value, onChange, enableClearButton, ...props }) => (
  <div styleName="TextInput">
    <input
      {...props}
      styleName={cx('TextInput__Input', {
        'TextInput__Input--clear': enableClearButton,
      })}
      value={value}
      onChange={onChange}
    />
    {enableClearButton && value && (
      <i
        styleName="TextInput__Clear"
        className="fa fa-times-circle"
        aria-hidden="true"
        onClick={() => onChange({
          currentTarget: {
            value: '',
          },
        })}
      />
    )}
  </div>
);

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  enableClearButton: PropTypes.bool,
};

TextInput.defaultProps = {
  enableClearButton: true,
};

export default TextInput;
