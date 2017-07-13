import React from 'react';
import { shallow } from 'enzyme';
import WithQuery, { SearchFilter } from '../SearchFilter';

jest.mock('components/Algolia', () => ({
  withQuery: jest.fn(Component => props => (
    <Component
      {...props}
      query="Hello"
      onChange={() => {}}
    />
  )),
}));

describe('<SearchFilter />', () => {
  const defaultProps = {
    query: 'This is a query',
    onChange: () => {},
  };

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <SearchFilter
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to call onChange', () => {
    const props = {
      ...defaultProps,
      onChange: jest.fn(),
    };

    const component = shallow(
      <SearchFilter
        {...props}
      />,
    );

    component
      .find('TextInput')
      .simulate('change', {
        currentTarget: {
          value: 'query',
        },
      });

    expect(props.onChange).toHaveBeenCalledWith('query');
  });

  describe('withQuery', () => {
    it('expect to render', () => {
      const component = shallow(
        <WithQuery />,
      );

      expect(component).toMatchSnapshot();
    });
  });
});
