import flowRight from 'lodash.flowright';
import { withRefinements, withClearRefinements } from 'components/Algolia';
import ClearList from 'components/ClearList';

export default flowRight(
  withRefinements,
  withClearRefinements,
)(ClearList);
