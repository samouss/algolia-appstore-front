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

const Ratings = ({ note, on }) => (
  <div styleName="Ratings">
    {new Array(on).fill(null).map((_, index) => {
      const next = index + 1;

      return (index < note && note < next) ? <StarHalf key={index} />
      : (next <= note) ? <Star key={index} />
      : <StarEmpty key={index} />;
    })}
  </div>
);

Ratings.propTypes = {
  note: PropTypes.number.isRequired,
  on: PropTypes.number.isRequired,
};

export default Ratings;
