import * as utils from 'core/utils';

describe('utils', () => {
  describe('getDisplayName', () => {
    const name = 'withHoC';

    it('exepct to return a displayName from component displayName', () => {
      const component = {
        displayName: 'FromDisplayName',
        name: 'FromName',
      };

      const expectation = 'withHoC(FromDisplayName)';
      const actual = utils.getDisplayName(component, name);

      expect(actual).toBe(expectation);
    });

    it('exepct to return a displayName from component name', () => {
      const component = {
        name: 'FromName',
      };

      const expectation = 'withHoC(FromName)';
      const actual = utils.getDisplayName(component, name);

      expect(actual).toBe(expectation);
    });

    it('exepct to return a displayName from default name', () => {
      const component = {};

      const expectation = 'withHoC(Component)';
      const actual = utils.getDisplayName(component, name);

      expect(actual).toBe(expectation);
    });
  });
});
