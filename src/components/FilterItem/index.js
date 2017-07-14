import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './index.css';

const FilterItem = ({
  isRefined,
  children,
  onChange,
}) => {
  const onClick = event => {
    event.preventDefault();
    onChange();
  };

  return (
    <li>
      <a
        href=""
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
};

export default FilterItem;
