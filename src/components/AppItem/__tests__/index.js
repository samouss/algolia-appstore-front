import React from 'react';
import { shallow } from 'enzyme';
import AppItem from '../index';

describe('<AppItem />', () => {
  const defaultProps = {
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
  };

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <AppItem
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render a paid app', () => {
    const props = {
      ...defaultProps,
      price: '0.99 $',
    };

    const component = shallow(
      <AppItem
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});
