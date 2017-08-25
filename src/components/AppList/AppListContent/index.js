import React from 'react';
import PropTypes from 'prop-types';
import InfiniteList from 'react-infinite-scroll-list';
import AppItem, { HitPropTypes } from 'components/AppItem';
import style from './index.css';

const AppListContent = ({
  hits,
  isLoading,
  isEndReached,
  onNextPage,
}) => (
  <InfiniteList
    root="viewport"
    isLoading={isLoading}
    isEndReached={isEndReached}
    onReachThreshold={onNextPage}
    containerClassName={style.AppListContent}
    containerTagName="ul"
    sentinelTagName="li"
    threshold={1700}
  >
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
  </InfiniteList>
);

AppListContent.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.shape(HitPropTypes)).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isEndReached: PropTypes.bool.isRequired,
  onNextPage: PropTypes.func.isRequired,
};

export default AppListContent;
