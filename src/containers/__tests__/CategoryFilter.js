import React from 'react';
import { shallow } from 'enzyme';
import { withFacet, withDisjunctiveFacetRefinement } from 'components/Algolia';
import CategoryFilter from '../CategoryFilter';

jest.mock('components/Algolia', () => ({
  withFacet: jest.fn(() => Component => props => (
    <Component
      {...props}
      facetValues={[]}
    />
  )),
  withDisjunctiveFacetRefinement: jest.fn(() => Component => props => (
    <Component
      {...props}
      onChange={() => {}}
    />
  )),
}));

describe('<CategoryFilter />', () => {
  it('expect to render', () => {
    const component = shallow(<CategoryFilter />).shallow();

    expect(component).toMatchSnapshot();
  });

  describe('withFacet', () => {
    it('expect to be called', () => {
      expect(withFacet).toHaveBeenCalledWith({
        facet: 'category',
        getFacetValuesOptions: {
          sortBy: ['count:desc'],
        },
      });
    });
  });

  describe('withDisjunctiveFacetRefinement', () => {
    it('expect to be called', () => {
      expect(withDisjunctiveFacetRefinement).toHaveBeenCalledWith({
        facet: 'category',
      });
    });
  });
});
