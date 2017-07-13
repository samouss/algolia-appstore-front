import React from 'react';
import { shallow } from 'enzyme';
import Advanced from '../index';

describe('<Advanced />', () => {
  const defaultProps = {};

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <Advanced
        {...props}
      >
        Content
      </Advanced>,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to turn content to visible', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <Advanced
        {...props}
      >
        Content
      </Advanced>,
    );

    component
      .find('[styleName="Advanced__Link"]')
      .simulate('click', {
        preventDefault: () => {},
      });

    expect(component).toMatchSnapshot();
  });

  it('expect to turn content to hide', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <Advanced
        {...props}
      >
        Content
      </Advanced>,
    );

    component.setState({
      isVisible: true,
    });

    component
      .find('[styleName="Advanced__Link"]')
      .simulate('click', {
        preventDefault: () => {},
      });

    expect(component).toMatchSnapshot();
  });
});
