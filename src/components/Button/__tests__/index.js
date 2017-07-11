import React from 'react';
import { shallow } from 'enzyme';
import Button from '../index';

describe('<Button />', () => {
  const defaultProps = {
    to: 'http://link.com',
    target: '_blank',
  };

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <Button
        {...props}
      >
        Link
      </Button>,
    );

    expect(component).toMatchSnapshot();
  });
});
