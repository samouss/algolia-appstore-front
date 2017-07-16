import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './index.css';

const FilterItem = ({
  isRefined,
  children,
  onChange,
  customClassName,
}) => {
  const onClick = event => {
    event.preventDefault();
    onChange();
  };

  return (
    <li>
      <a
        href=""
        className={customClassName}
        styleName={cx('FilterItem', {
          'FilterItem--active': isRefined,
        })}
        onClick={onClick}
      >
        {children}
      </a>
    </li>
  );
};

FilterItem.propTypes = {
  isRefined: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  customClassName: PropTypes.string,
};

FilterItem.defaultProps = {
  customClassName: '',
};

export default FilterItem;
