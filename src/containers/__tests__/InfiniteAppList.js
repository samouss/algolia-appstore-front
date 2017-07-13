import React from 'react';
import { shallow } from 'enzyme';
import { withInfiniteHits } from 'components/Algolia';
import InfiniteAppList from '../InfiniteAppList';

jest.mock('components/Algolia', () => ({
  withInfiniteHits: jest.fn(() => Component => props => (
    <Component
      {...props}
      hits={[]}
    />
  )),
}));

describe('<InfiniteAppList />', () => {
  it('expect to render', () => {
    const component = shallow(
      <InfiniteAppList />,
    );

    expect(component).toMatchSnapshot();
  });

  describe('withInfiniteHits', () => {
    it('expect to be called', () => {
      expect(withInfiniteHits).toHaveBeenCalledWith({
        hitsPerPage: 50,
      });
    });
  });
});
