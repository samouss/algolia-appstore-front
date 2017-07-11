import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Thumbnail = ({ source, alt, ...props }) => (
  <img
    {...props}
    src={source}
    alt={alt}
    styleName="Thumbnail"
  />
);

Thumbnail.propTypes = {
  source: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Thumbnail;
