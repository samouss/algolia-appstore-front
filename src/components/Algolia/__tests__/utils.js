import * as utils from '../utils';

describe('algolia', () => {
  describe('utils', () => {
    it('expect to have highlightPreTag', () => {
      const expectation = '__algolia__highlight__pre__tag__';
      const actual = utils.highlightPreTag;

      expect(actual).toBe(expectation);
    });

    it('expect to have highlightPostTag', () => {
      const expectation = '__algolia__highlight__post__tag__';
      const actual = utils.highlightPostTag;

      expect(actual).toBe(expectation);
    });

    describe('escapeAndReplaceTag', () => {
      it('expect to escape input with matching tag', () => {
        const input = `
          Hello from <script>with highlight</script>,
          __algolia__highlight__pre__tag__there is a match__algolia__highlight__post__tag__!!
        `;

        const expectation = `
          Hello from &lt;script&gt;with highlight&lt;/script&gt;,
          <em>there is a match</em>!!
        `;

        const actual = utils.escapeAndReplaceTag(input);

        expect(actual).toBe(expectation);
      });

      it('expect to escape input with multi matching tag', () => {
        const input = `
          Hello from <script>with highlight</script>,
          __algolia__highlight__pre__tag__there is a match__algolia__highlight__post__tag__!!
          But there is __algolia__highlight__pre__tag__an other a match__algolia__highlight__post__tag__...
        `;

        const expectation = `
          Hello from &lt;script&gt;with highlight&lt;/script&gt;,
          <em>there is a match</em>!!
          But there is <em>an other a match</em>...
        `;

        const actual = utils.escapeAndReplaceTag(input);

        expect(actual).toBe(expectation);
      });

      it('expect to escape input wihtout matching tag', () => {
        const input = `
          Hello from <script>with highlight</script>,
          there is no match!!
        `;

        const expectation = `
          Hello from &lt;script&gt;with highlight&lt;/script&gt;,
          there is no match!!
        `;

        const actual = utils.escapeAndReplaceTag(input);

        expect(actual).toBe(expectation);
      });
    });
  });
});
