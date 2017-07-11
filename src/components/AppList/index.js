import React from 'react';
import AppListHeader from './AppListHeader';
import AppListContent from './AppListContent';
import './index.css';

const AppList = props => (
  <div styleName="AppList">
    <AppListHeader
      {...props}
    />

    <AppListContent
      {...props}
    />
  </div>
);

export default AppList;
