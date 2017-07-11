import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../index';

describe('<Layout />', () => {
  const defaultProps = {};

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <Layout
        {...props}
      >
        Content
      </Layout>,
    );

    expect(component).toMatchSnapshot();
  });
});
