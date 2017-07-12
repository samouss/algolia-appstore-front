import React from 'react';
import { Provider } from 'components/Algolia';
import Layout from 'components/Layout';
import Filters from 'components/Filters';
import Search from 'containers/Search';
import PaginateAppList from 'containers/PaginateAppList';

const appId = 'RTMJH2ID8J';
const apiKey = 'f8dac63a6dc38d8bd5893dad8969d819';
const indexName = 'apps';

const App = () => (
  <Provider
    appId={appId}
    apiKey={apiKey}
    indexName={indexName}
  >
    <Layout>
      <Filters>
        <Search />
      </Filters>

      <PaginateAppList />
    </Layout>
  </Provider>
);

export default App;
