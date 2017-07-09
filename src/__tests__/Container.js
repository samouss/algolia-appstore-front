import React from 'react';
import { shallow } from 'enzyme';
import Container from '../Container';

describe('sample', () => {
  it('should pass', () => {
    const expectation = true;
    const actual = true;

    expect(actual).toEqual(expectation);
  });

  it('should pass too', () => {
    const fn = jest.fn();

    fn();

    expect(fn).toHaveBeenCalled();
  });

  it('should pass with JSX', () => {
    const props = {
      title: 'My React App',
    };

    const component = shallow(
      <Container
        {...props}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});
