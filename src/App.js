import React from 'react';
import { Provider } from 'components/Algolia';
import Layout from 'components/Layout';
import Filters from 'components/Filters';
import AdvancedFilters from 'components/AdvancedFilters';
import SearchFilter from 'containers/SearchFilter';
import CategoryFilter from 'containers/CategoryFilter';
import RatingFilter from 'containers/RatingFilter';
import RatingSort from 'containers/RatingSort';
import ClearFilter from 'containers/ClearFilter';
import InfiniteAppList from 'containers/InfiniteAppList';
import configureAlgolia from './configureAlgolia';

const algolia = configureAlgolia();

const App = () => (
  <Provider
    {...algolia}
  >
    <Layout>
      <Filters>
        <SearchFilter />

        <AdvancedFilters>
          <CategoryFilter />
          <RatingFilter />
          <RatingSort />
          <ClearFilter />
        </AdvancedFilters>
      </Filters>

      <InfiniteAppList />
    </Layout>
  </Provider>
);

export default App;
