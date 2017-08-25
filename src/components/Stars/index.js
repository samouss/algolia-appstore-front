/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Star = () => (
  <i className="fa fa-star" aria-hidden="true" />
);

const StarEmpty = () => (
  <i className="fa fa-star-o" aria-hidden="true" />
);

const StarHalf = () => (
  <i className="fa fa-star-half-o" aria-hidden="true" />
);

const Stars = ({ value, on, color }) => (
  <div
    styleName="Stars"
    style={{ color }}
  >
    {new Array(on).fill(null).map((_, index) => {
      const next = index + 1;

      return (index < value && value < next) ? <StarHalf key={index} />
        : (next <= value) ? <Star key={index} />
          : <StarEmpty key={index} />;
    })}
  </div>
);

Stars.propTypes = {
  value: PropTypes.number.isRequired,
  on: PropTypes.number.isRequired,
  color: PropTypes.string,
};

Stars.defaultProps = {
  color: '',
};

export default Stars;
