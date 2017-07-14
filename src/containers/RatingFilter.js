import flowRight from 'lodash.flowright';
import { withFacet, withNumericRefinement } from 'components/Algolia';
import RatingList from 'components/RatingList';

const facet = 'rating';
const operator = '>=';

export const reduceFacetValues = (facetValues, helperState) => {
  const currentRefinementsForOperator = helperState.getNumericRefinement(facet, operator) || [];

  return [5, 4, 3, 2, 1, 0].reduce((acc, rating) => {
    const countCurrentRating = facetValues
      .filter(_ => parseInt(_.name, 10) >= rating)
      .reduce((acc, facetValue) => acc + facetValue.count, 0);

    const isRatingRefined = currentRefinementsForOperator.includes(rating);
    const isCountLessThanZero = countCurrentRating <= 0;
    const isFacetValuesEmpty = !facetValues.length;

    if (isFacetValuesEmpty || (!isRatingRefined && isCountLessThanZero)) {
      return acc;
    }

    return acc.concat({
      name: rating.toString(),
      count: countCurrentRating,
      isRefined: isRatingRefined,
    });
  }, []);
};

export default flowRight(
  withFacet({
    facet,
    reduceFacetValues,
  }),
  withNumericRefinement({
    attribute: facet,
    operator,
  }),
)(RatingList);
