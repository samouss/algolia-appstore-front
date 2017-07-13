export const createMockAlgoliaClient = () => ({});

export const createMockAlgoliaHelper = () => ({
  // Configuration
  getIndex: jest.fn(() => 'index_name'),
  setIndex: jest.fn().mockReturnThis(),
  setQuery: jest.fn().mockReturnThis(),
  setQueryParameter: jest.fn().mockReturnThis(),

  // Faceting
  addDisjunctiveFacetRefinement: jest.fn().mockReturnThis(),
  removeDisjunctiveFacetRefinement: jest.fn().mockReturnThis(),

  addNumericRefinement: jest.fn().mockReturnThis(),
  removeNumericRefinement: jest.fn().mockReturnThis(),

  // Pagination
  nextPage: jest.fn().mockReturnThis(),

  // State
  getState: jest.fn(),

  // Events
  on: jest.fn().mockReturnThis(),
  removeListener: jest.fn().mockReturnThis(),

  // Search
  search: jest.fn().mockReturnThis(),
});
