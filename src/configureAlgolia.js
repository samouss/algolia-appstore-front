const configureAlgolia = () => ({
  appId: 'RTMJH2ID8J',
  apiKey: 'f8dac63a6dc38d8bd5893dad8969d819',
  indexName: 'apps_rating_desc',
  options: {
    disjunctiveFacets: ['category'],
  },
});

export default configureAlgolia;
