import React from 'react';
import { Provider } from 'components/Algolia';
import { Container, Filters, Advanced, Column, Row } from 'components/Layout';
import SearchFilter from 'containers/SearchFilter';
import CategoryFilter from 'containers/CategoryFilter';
import RatingSort from 'containers/RatingSort';
import InfiniteAppList from 'containers/InfiniteAppList';
import configureAlgolia from './configureAlgolia';

const algolia = configureAlgolia();

const App = () => (
  <Provider {...algolia} >
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
