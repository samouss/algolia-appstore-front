import React from 'react';
import { shallow } from 'enzyme';
import Thumbnail from '../index';

describe('<Thumbnail />', () => {
  const defaultProps = {
    source: 'http://link.com',
    alt: 'Image alt',
    title: 'Image title',
  };

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <Thumbnail
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});
