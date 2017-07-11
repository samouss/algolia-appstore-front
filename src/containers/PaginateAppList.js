import { withPaginateResults } from 'components/Algolia';
import AppList from 'components/AppList';

const PaginateAppList = withPaginateResults({
  hitsPerPage: 25,
})(AppList);

export default PaginateAppList;
