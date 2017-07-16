import React from 'react';
import { shallow } from 'enzyme';
import { withRefinements, withClearRefinements } from 'components/Algolia';
import ClearFilter from '../ClearFilter';

jest.mock('components/Algolia', () => ({
  withRefinements: jest.fn(Component => props => (
    <Component
      {...props}
      refinements={[]}
    />
  )),
  withClearRefinements: jest.fn(Component => props => (
    <Component
      {...props}
      onClear={() => {}}
    />
  )),
}));

describe('<ClearFilter />', () => {
  it('expect to render', () => {
    const component = shallow(<ClearFilter />).shallow();

    expect(component).toMatchSnapshot();
  });

  describe('withRefinements', () => {
    it('expect to be called', () => {
      expect(withRefinements).toHaveBeenCalled();
    });
  });

  describe('withClearRefinements', () => {
    it('expect to be called', () => {
      expect(withClearRefinements).toHaveBeenCalled();
    });
  });
});
