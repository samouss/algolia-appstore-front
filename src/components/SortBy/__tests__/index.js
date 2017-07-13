import React from 'react';
import { shallow } from 'enzyme';
import SortBy from '../index';

describe('<SortBy />', () => {
  const defaultProps = {};

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <SortBy
        {...props}
      >
        Content
      </SortBy>,
    );

    expect(component).toMatchSnapshot();
  });
});
