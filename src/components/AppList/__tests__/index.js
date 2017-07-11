import React from 'react';
import { shallow } from 'enzyme';
import AppList from '../index';

describe('<AppList />', () => {
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
    nbHits: 500,
    processingTimeMS: 5,
    isInitialLoad: false,
  };

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <AppList
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render on initial load', () => {
    const props = {
      ...defaultProps,
      isInitialLoad: true,
    };

    const component = shallow(
      <AppList
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});
