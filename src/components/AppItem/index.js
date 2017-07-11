import React from 'react';
import PropTypes from 'prop-types';
import { escapeAndReplaceTag } from 'components/Algolia';
import Thumbnail from 'components/Thumbnail';
import Ratings from 'components/Ratings';
import Button from 'components/Button';
import './index.css';

export const HitPropTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  ratingCount: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  _highlightResult: PropTypes.shape({
    name: PropTypes.shape({
      value: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const AppItem = ({
  name,
  image,
  link,
  rating,
  ratingCount,
  price,
  _highlightResult,
}) => (
  <li styleName="AppItem">
    <Thumbnail
      source={image}
      alt={name}
    />

    <div styleName="AppItem__Details">
      <p
        styleName="AppItem__Name"
        dangerouslySetInnerHTML={{
          __html: escapeAndReplaceTag(_highlightResult.name.value),
        }}
      />

      <div styleName="AppItem__Ratings">
        <Ratings
          note={rating}
          on={5}
        />

        <span styleName="AppItem__Ratings__Count">
          ({ratingCount})
        </span>
      </div>
    </div>

    <div styleName="AppItem__Actions">
      <Button
        to={link}
        target="_blank"
      >
        {price === '0 $' ? 'Get' : price}
      </Button>
    </div>
  </li>
);

AppItem.propTypes = HitPropTypes;

export default AppItem;
