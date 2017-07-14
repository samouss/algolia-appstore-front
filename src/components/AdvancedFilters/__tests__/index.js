import React from 'react';
import { shallow } from 'enzyme';
import AdvancedFilters from '../index';

describe('<AdvancedFilters />', () => {
  const defaultProps = {};

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <AdvancedFilters
        {...props}
      >
        Content
      </AdvancedFilters>,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to turn content to visible', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <AdvancedFilters
        {...props}
      >
        Content
      </AdvancedFilters>,
    );

    component
      .find('[styleName="AdvancedFilters__Link"]')
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
      <AdvancedFilters
        {...props}
      >
        Content
      </AdvancedFilters>,
    );

    component.setState({
      isVisible: true,
    });

    component
      .find('[styleName="AdvancedFilters__Link"]')
      .simulate('click', {
        preventDefault: () => {},
      });

    expect(component).toMatchSnapshot();
  });
});
