import React from 'react';
import { Provider } from 'components/Algolia';
import { Container, Filters, Advanced, Column, Row } from 'components/Layout';
import SearchFilter from 'containers/SearchFilter';
import CategoryFilter from 'containers/CategoryFilter';
import RatingSort from 'containers/RatingSort';
import InfiniteAppList from 'containers/InfiniteAppList';

const appId = 'RTMJH2ID8J';
const apiKey = 'f8dac63a6dc38d8bd5893dad8969d819';
const indexName = 'apps_rating_desc';
const options = {
  disjunctiveFacets: ['category'],
};

const App = () => (
  <Provider
    appId={appId}
    apiKey={apiKey}
    indexName={indexName}
    options={options}
  >
    <Container>
      <Filters>
        <SearchFilter />

        <Advanced>
          <Column>
            <Row>
              <CategoryFilter />
            </Row>
          </Column>

          <Column>
            <Row>
              <RatingSort />
            </Row>
          </Column>
        </Advanced>
      </Filters>

      <InfiniteAppList />
    </Container>
  </Provider>
);

export default App;
