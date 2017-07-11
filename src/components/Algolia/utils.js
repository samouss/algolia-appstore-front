import escape from 'lodash.escape';

export const highlightPreTag = '__algolia__highlight__pre__tag__';
export const highlightPostTag = '__algolia__highlight__post__tag__';

export const escapeAndReplaceTag = value => {
  return escape(value)
    .replace(highlightPreTag, '<em>')
    .replace(highlightPostTag, '</em>');
};
