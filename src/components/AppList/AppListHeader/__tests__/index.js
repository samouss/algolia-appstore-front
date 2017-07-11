import React from 'react';
import { shallow } from 'enzyme';
import AppListHeader from '../index';

describe('<AppListHeader />', () => {
  const defaultProps = {
    nbHits: 500,
    processingTimeMS: 5,
    isInitialLoad: false,
  };

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <AppListHeader
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
      <AppListHeader
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});
