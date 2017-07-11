import React from 'react';
import { shallow } from 'enzyme';
import AppListContent from '../index';

describe('<AppListContent />', () => {
  const defaultProps = {
    hits: [
      {
        objectID: '1234',
        name: 'Cut the Rope',
        image: 'http://image.com',
        link: 'http://link.com',
        rating: 3,
        ratingCount: 1234,
        price: '0 $',
        _highlightResult: {
          name: {
            value: '__algolia__highlight__pre__tag__Cut the__algolia__highlight__post__tag__ Rope',
          },
        },
      },
      {
        objectID: '5678',
        name: 'Angry Birds',
        image: 'http://image.com',
        link: 'http://link.com',
        rating: 5,
        ratingCount: 6789,
        price: '0 $',
        _highlightResult: {
          name: {
            value: 'Angry Birds',
          },
        },
      },
    ],
    isLoading: false,
    isEndReached: false,
    onNextPage: () => {},
  };

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <AppListContent
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to call onNextPage', () => {
    const props = {
      ...defaultProps,
      onNextPage: jest.fn(),
    };

    const component = shallow(
      <AppListContent
        {...props}
      />,
    );

    component
      .find('InfiniteList')
      .simulate('reachThreshold');

    expect(props.onNextPage).toHaveBeenCalled();
  });
});
