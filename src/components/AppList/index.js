import React from 'react';
import PropTypes from 'prop-types';
import AppItem, { HitPropTypes } from 'components/AppItem';
import './index.css';

// @TODO: maybe split this component for
// <HeaderList>
// <HeaderContent>
// something like that, will see

const AppList = ({
  hits,
  nbHits,
  processingTimeMS,
  isInitialLoad,
}) => (
  <div styleName="AppList">
    <div styleName="AppList__Header">
      {!isInitialLoad && (
        <p styleName="AppList__Stat">
          <span styleName="AppList__StatHits">{nbHits.toLocaleString()} results </span>
          <span>found in </span>
          <span styleName="AppList__StatTime">{processingTimeMS}ms</span>
        </p>
      )}
    </div>

    <ul styleName="AppList__Content">
      {hits.map(hit => (
        <AppItem
          key={hit.objectID}
          name={hit.name}
          image={hit.image}
          link={hit.link}
          rating={hit.rating}
          ratingCount={hit.ratingCount}
          price={hit.price}
          _highlightResult={hit._highlightResult}
        />
      ))}
    </ul>
  </div>
);

AppList.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.shape(HitPropTypes)).isRequired,
  nbHits: PropTypes.number.isRequired,
  processingTimeMS: PropTypes.number.isRequired,
  isInitialLoad: PropTypes.bool.isRequired,
};

export default AppList;
