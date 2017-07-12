export const createMockAlgoliaClient = () => ({});

export const createMockAlgoliaHelper = () => ({
  // Configuration
  setQuery: jest.fn().mockReturnThis(),
  setQueryParameter: jest.fn().mockReturnThis(),

  // Pagination
  nextPage: jest.fn().mockReturnThis(),

  // Events
  on: jest.fn().mockReturnThis(),
  removeListener: jest.fn().mockReturnThis(),

  // Search
  search: jest.fn().mockReturnThis(),
});
