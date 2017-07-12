import flowRight from 'lodash.flowright';
import { withFacet, withDisjunctiveFacetRefinement } from 'components/Algolia';
import CategoryList from 'components/CategoryList';

const facet = 'category';

export default flowRight(
  withFacet({ facet }),
  withDisjunctiveFacetRefinement({ facet }),
)(CategoryList);
