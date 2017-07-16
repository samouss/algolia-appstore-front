import React from 'react';
import { shallow } from 'enzyme';
import { ALGOLIA_INDEX_NAME_DESC, ALGOLIA_INDEX_NAME_ASC } from 'env';
import WithQuery, { RatingSort } from '../RatingSort';

jest.mock('components/Algolia', () => ({
  withIndex: jest.fn(Component => props => (
    <Component
      {...props}
      indexName="sample"
      onChange={() => {}}
    />
  )),
}));

describe('<RatingSort />', () => {
  const defaultProps = {
    indexName: 'index',
    onChange: () => {},
  };

  it('expect to render', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <RatingSort
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to call onChange on first sort', () => {
    const props = {
      ...defaultProps,
      onChange: jest.fn(),
    };

    const component = shallow(
      <RatingSort
        {...props}
      />,
    );

    component
      .find('FilterItem')
      .first()
      .simulate('change');

    expect(props.onChange).toHaveBeenCalledWith(ALGOLIA_INDEX_NAME_DESC);
  });

  it('expect to call onChange on second sort', () => {
    const props = {
      ...defaultProps,
      onChange: jest.fn(),
    };

    const component = shallow(
      <RatingSort
        {...props}
      />,
    );

    component
      .find('FilterItem')
      .at(1)
      .simulate('change');

    expect(props.onChange).toHaveBeenCalledWith(ALGOLIA_INDEX_NAME_ASC);
  });

  describe('withIndex', () => {
    it('expect to render', () => {
      const component = shallow(
        <WithQuery />,
      );

      expect(component).toMatchSnapshot();
    });
  });
});
