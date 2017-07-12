import { withInfiniteHits } from 'components/Algolia';
import AppList from 'components/AppList';

const InfiniteAppList = withInfiniteHits({
  hitsPerPage: 50,
})(AppList);

export default InfiniteAppList;
