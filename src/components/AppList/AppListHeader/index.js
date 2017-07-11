import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const AppList = ({
  nbHits,
  processingTimeMS,
  isInitialLoad,
}) => (
  <div styleName="AppListHeader">
    {!isInitialLoad && (
      <p styleName="AppListHeader__Stat">
        <span styleName="AppListHeader__StatHits">{nbHits.toLocaleString()} results </span>
        <span>found in </span>
        <span>{processingTimeMS}ms</span>
      </p>
    )}
  </div>
);

AppList.propTypes = {
  nbHits: PropTypes.number.isRequired,
  processingTimeMS: PropTypes.number.isRequired,
  isInitialLoad: PropTypes.bool.isRequired,
};

export default AppList;
