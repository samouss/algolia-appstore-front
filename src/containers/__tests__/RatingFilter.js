import React from 'react';
import { shallow } from 'enzyme';
import { withFacet, withNumericRefinement } from 'components/Algolia';
import RatingFilter, { reduceFacetValues } from '../RatingFilter';

jest.mock('components/Algolia', () => ({
  withFacet: jest.fn(() => Component => props => (
    <Component
      {...props}
      facetValues={[]}
    />
  )),
  withNumericRefinement: jest.fn(() => Component => props => (
    <Component
      {...props}
      onChange={() => {}}
    />
  )),
}));

describe('<RatingFilter />', () => {
  it('expect to render', () => {
    const component = shallow(<RatingFilter />).shallow();

    expect(component).toMatchSnapshot();
  });

  describe('withFacet', () => {
    it('expect to be called', () => {
      expect(withFacet).toHaveBeenCalledWith({
        facet: 'rating',
        reduceFacetValues,
      });
    });
  });

  describe('withDisjunctiveFacetRefinement', () => {
    it('expect to be called', () => {
      expect(withNumericRefinement).toHaveBeenCalledWith({
        attribute: 'rating',
        operator: '>=',
      });
    });
  });

  describe('reduceFacetValues', () => {
    const helperState = {
      getNumericRefinement: jest.fn(),
    };

    it('expect to return facetValues grouped by 5 to 0 without refined', () => {
      const facetValues = [
        { name: '5', count: 1 },
        { name: '4.5', count: 1 },
        { name: '4', count: 1 },
        { name: '3.5', count: 1 },
        { name: '3', count: 1 },
        { name: '2.5', count: 1 },
        { name: '2', count: 1 },
        { name: '1.5', count: 1 },
        { name: '1', count: 1 },
      ];

      const expectation = [
        { name: '5', count: 1, isRefined: false },
        { name: '4', count: 3, isRefined: false },
        { name: '3', count: 5, isRefined: false },
        { name: '2', count: 7, isRefined: false },
        { name: '1', count: 9, isRefined: false },
        { name: '0', count: 9, isRefined: false },
      ];

      const actual = reduceFacetValues(facetValues, helperState);

      expect(actual).toEqual(expectation);
    });

    it('expect to return facetValues grouped by 5 to 0 without zero count', () => {
      const facetValues = [
        { name: '3.5', count: 1 },
        { name: '3', count: 1 },
        { name: '2.5', count: 1 },
        { name: '2', count: 1 },
      ];

      const expectation = [
        { name: '3', count: 2, isRefined: false },
        { name: '2', count: 4, isRefined: false },
        { name: '1', count: 4, isRefined: false },
        { name: '0', count: 4, isRefined: false },
      ];

      const actual = reduceFacetValues(facetValues, helperState);

      expect(actual).toEqual(expectation);
    });

    it('expect to return facetValues grouped by 5 to 0 with refined', () => {
      helperState.getNumericRefinement.mockImplementationOnce(() => [2]);

      const facetValues = [
        { name: '5', count: 1 },
        { name: '4.5', count: 1 },
        { name: '4', count: 1 },
        { name: '3.5', count: 1 },
        { name: '3', count: 1 },
        { name: '2.5', count: 1 },
        { name: '2', count: 1 },
        { name: '1.5', count: 1 },
        { name: '1', count: 1 },
      ];

      const expectation = [
        { name: '5', count: 1, isRefined: false },
        { name: '4', count: 3, isRefined: false },
        { name: '3', count: 5, isRefined: false },
        { name: '2', count: 7, isRefined: true },
        { name: '1', count: 9, isRefined: false },
        { name: '0', count: 9, isRefined: false },
      ];

      const actual = reduceFacetValues(facetValues, helperState);

      expect(actual).toEqual(expectation);
    });

    it('expect to return facetValues grouped by 5 to 0 with refined and zero count', () => {
      helperState.getNumericRefinement.mockImplementationOnce(() => [4]);

      const facetValues = [
        { name: '3.5', count: 1 },
        { name: '3', count: 1 },
        { name: '2.5', count: 1 },
        { name: '2', count: 1 },
      ];

      const expectation = [
        { name: '4', count: 0, isRefined: true },
        { name: '3', count: 2, isRefined: false },
        { name: '2', count: 4, isRefined: false },
        { name: '1', count: 4, isRefined: false },
        { name: '0', count: 4, isRefined: false },
      ];

      const actual = reduceFacetValues(facetValues, helperState);

      expect(actual).toEqual(expectation);
    });

    it('expect to return empty array when facetValues is empty', () => {
      const facetValues = [];

      const expectation = [];
      const actual = reduceFacetValues(facetValues, helperState);

      expect(actual).toEqual(expectation);
    });
  });
});
