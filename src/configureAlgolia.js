import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME_DESC } from './env';

const configureAlgolia = () => ({
  appId: ALGOLIA_APP_ID,
  apiKey: ALGOLIA_API_KEY,
  indexName: ALGOLIA_INDEX_NAME_DESC,
  options: {
    disjunctiveFacets: [
      'category',
      'rating',
    ],
  },
});

export default configureAlgolia;
